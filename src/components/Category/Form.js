import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import CategoryService from '../../services/category';
import CategoryImage from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MdPlus from 'react-icons/lib/md/add';

import styles from './styles';

@observer
class Form extends Component {
  @observable category = {
    title: "",
    description: "",
    photoURL: "",
  };

  @observable isSubmiting = false;
  @observable error = {};

  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.onOpenUpload = this.onOpenUpload.bind(this);
  }

  add() {
    const errors = {};
    this.isSubmiting = true;
    const category = {
      ...this.category,
      title: this.category.title,
      description: this.category.description
    }

    !!!category.title && (errors.title = 'Title can\' be blank');

    if (Object.keys(errors).length > 0) {
      this.error = {...errors};
      this.isSubmiting = false;
      return Promise.reject(errors);
    }

    this.isSubmiting = false;
    return CategoryService.onAdd(category);
  }

  edit(key) {
    const errors = {};
    this.isSubmiting = true;
    const category = {
      ...this.category,
      title: this.category.title,
      description: this.category.description
    }

    !!!category.title && (errors.title = 'Title can\' be blank');

    if (Object.keys(errors).length > 0) {
      this.error = {...errors};
      this.isSubmiting = false;
      return Promise.reject(errors);
    }

    this.isSubmiting = false;

    return CategoryService.onEdit(category, key);
  }

  onOpenUpload() {
    this.inputFile.click();
    this.inputFile.onchange = (e) => {
      const reader = new FileReader();
      const file = this.inputFile.files[0];

      reader.onloadend = () => {
        this.imageName = file.name;
        this.category.photoURL = reader.result;
      }
      this.file = file;
      reader.readAsDataURL(file);
    }
  }

  render() {
    const { title, photoURL, description } = this.category
    return (
      <Paper
        zDepth={0}
        style={styles.container}
      >
        <CategoryImage
          style={styles.categoryImage}
        >
          <IconButton
            style={styles.icon}
            onTouchTap={this.onOpenUpload}
          >
            <MdPlus size={20} />
          </IconButton>
          <img style={styles.img} src={photoURL} alt={title}/>
        </CategoryImage>
        <TextField
          fullWidth
          value={title}
          name="title"
          floatingLabelFixed
          hintText="Category title"
          disabled={this.isSubmiting}
          errorText={this.error.title}
          underlineFocusStyle={styles.underlineFocusStyle}
          floatingLabelFocusStyle={{color: '#50d2c2'}}
          floatingLabelText="TITLE"
          onChange={e => (this.category = { ...this.category, title: e.target.value })}
        />
        <TextField
          fullWidth
          value={description}
          name="description"
          floatingLabelFixed
          hintText="Description"
          disabled={this.isSubmiting}
          underlineFocusStyle={styles.underlineFocusStyle}
          floatingLabelFocusStyle={{color: '#50d2c2'}}
          floatingLabelText="DESCRIPTION"
          onChange={e => (this.category = { ...this.category, description: e.target.value })}
        />
        <input
          style={{display: 'none'}}
          type="file" ref={(ref) => (this.inputFile = ref)} accept="image/*" />
      </Paper>
    );
  }
}

export default Form
