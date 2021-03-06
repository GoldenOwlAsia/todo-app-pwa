import { observable, computed, autorun, toJS } from 'mobx';
import { database } from '../db/firebase';
import moment from 'moment';
import UserService from './user';
import IndexDb from './indexDb';
import Network from './network';

class Task {
  database;
  isLoaded;
  oldCurrent = null;
  @observable taskList = {};
  createdBy = UserService.info.uid;
  @observable current = moment().format('MMMM DD, YYYY');

  constructor() {
    autorun(() => {
      if((this.createdBy === UserService.info.uid && !!this.createdBy)
          && this.oldCurrent === this.current) return;
      this.createdBy = UserService.info.uid;
      this.oldCurrent = toJS(this.current);
      const createdBy = this.createdBy;

      if (!Network.check) {
        this.dataOffline(UserService.info.uid);
        !!this.database && typeof this.database.off === 'function' && this.database.off();
        return;
      } else {
        this.database = null;
      }

      if (!this.createdBy) this.taskList = {};

      this.database = database.ref('/tasks')
        .orderByChild('date')
        .equalTo(this.current)
        .on('value', (snapshot) => {
          const taskList = snapshot.val() || {};
          this.isLoaded = true;
          this.taskList = Object.keys(taskList).reduce((obj, key) => {
            const task = taskList[key]
            if (!!createdBy && task.createdBy === createdBy) {
              obj[key] = task;
              IndexDb.addTask(task, key);
            };
            return obj;
          }, {})
        });
      });
  }

  dataOffline(uid) {
    this.taskList = {};
    setTimeout(() => {
      IndexDb.fetchAllTask(uid || this.createdBy).then(taskList => {
        if (!this.isLoaded || !Network.check) {
          this.taskList = Object.keys(taskList).reduce((obj, key) => {
            const task = taskList[key];
            if (!!this.current && task.date === this.current) {
              obj[key] = task;
            };
            return obj;
          }, {})
        }
      })
    }, 2000);
  }

  @computed get Completed() {
    const taskList = { ...this.taskList };

    if (Object.keys(taskList).length < 1) return {};

    return (
      Object
        .keys(taskList)
        .filter(key => !!taskList[key].completed)
        .reduce((obj, key) => ({ ...obj, [key]: taskList[key] }),{})
    );
  }

  @computed get UnCompleted() {
    const taskList = { ...this.taskList };
    if (Object.keys(taskList).length < 1) return {};

    return (
      Object
        .keys(taskList)
        .filter(key => !taskList[key].completed)
        .reduce((obj, key) => ({ ...obj, [key]: taskList[key] }),{})
    );
  }

  @computed get lengthUncompleted() {
    return Object.keys(this.UnCompleted).length;
  }

  @computed get lengthCompleted() {
    return Object.keys(this.Completed).length;
  }

  findByDate(date) {
    this.current = moment(date).format('MMMM DD, YYYY')
  }

  onToggle(key, value) {
    const updatedAt = Date.now();
    const updatedBy = UserService.info.uid;
    const taskList = {...this.taskList};
    const task = { ...taskList[key], completed: value, updatedAt, updatedBy };

    return new Promise((resolve, reject) => {
      if (!Network.check) {
        IndexDb.addTask(task, key)
              .then((res, ...args) => {
                taskList[key] = {...taskList[key], ...task};
                this.taskList = taskList;
                resolve(res, ...args);
              }).catch(reject);
      } else {
        return database.ref(`tasks/${key}`)
              .update(task)
              .then(resolve).catch(reject);
      }
    })
  }

  onAdd(task) {
    const createdAt = Date.now();
    const createdBy = UserService.info.uid;
    const key = createdAt;
    const newTask = { ...task, createdAt, updatedAt: createdAt, createdBy, updatedBy: createdBy };

    return new Promise((resolve, reject) => {
      if (!Network.check) {
        newTask.isOff = true;
        IndexDb.addTask(newTask, key)
              .then((res, ...args) => {
                localStorage.setItem('syncLocalToServer', true);
                const taskList = {...this.taskList};
                taskList[key] = {...taskList[key], ...newTask};
                this.taskList = taskList;
                resolve(res, ...args);
              }).catch(reject);
      } else {
        return database.ref('tasks')
                .push(newTask)
                .then(resolve).catch(reject);
      }
    })
  }

  onDelete(key) {
    const taskList = { ...this.taskList };
    delete taskList[key];
    this.taskList = { ...taskList };
    return database.ref(`/tasks/${key}`).remove()
  }

  getTaskByCategory(categoryId) {
    const createdBy = UserService.info.uid;
    return new Promise((resolve, reject) => {
      if (!Network.check) {
        IndexDb.fetchAllTask(this.createdBy).then(taskList => {
          if (!Network.check) {
            resolve(Object.keys(taskList).reduce((obj, key) => {
              const task = taskList[key];
              if (!!createdBy && task.createdBy !== createdBy && categoryId === task.categoryId) return obj;

              const type = task.completed ? 'Completed' : 'UnCompleted';
              obj[type][key] = task;
              return obj;
            }, { Completed: {}, UnCompleted: {} }));
          }
        })
      } else {
        database.ref('/tasks')
          .orderByChild('categoryId')
          .equalTo(categoryId)
          .on('value', snapshot => {
            const taskList = snapshot.val() || {};

            resolve(Object.keys(taskList).reduce((obj, key) => {
              const task = taskList[key];
              if (!!createdBy && task.createdBy !== createdBy) return obj;

              const type = task.completed ? 'Completed' : 'UnCompleted';
              obj[type][key] = task;
              return obj;
            }, { Completed: {}, UnCompleted: {} }));
          });
      }
    });
  }
}

export default new Task()
