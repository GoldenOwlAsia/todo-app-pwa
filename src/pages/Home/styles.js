export default {
  flexColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    maxWidth: 400,
    minHeight: 667,
    margin: '0 auto',
    paddingBottom: 30,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px'
  },
  header: {
    alignItems: 'center'
  },
  headerImage: {
    position: 'relative'
  },
  tab: {
    width: '100%',
    margin: '0 auto',
  },
  tabItem: {
    backgroundColor: '#50D2C2'
  },
  inkBar: {
    backgroundColor: '#009688'
  },
  title: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '40px',
    color: '#FFF',
    margin: '0',
    width: '100%',
    textAlign: 'center'
  },
  numberTask: {
    display: 'flex',
    justifyContent: 'center'
  },
  date: {
    width: '100%',
    fontSize: '18px'
  }
};
