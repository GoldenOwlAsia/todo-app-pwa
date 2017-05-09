export default {
  container: {
    flex: 1,
    display: 'flex',
    boxShadow: 'none',
    padding: '0 30px',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    maxWidth: 100,
  },
  form: {
    marginRight: 5,
  },
  headerForm: {
    fontSize: 13,
    margin: 'auto',
    color: 'rgb(244, 67, 54)',
  },
  input: {
    floatingLabelStyle: {
      textTransform: 'uppercase',
    },
    underlineFocusStyle: {
      borderWidth: 1,
      borderColor: '#50D2C2',
    },
    floatingLabelFocusStyle: {
      color: '#50D2C2',
    },
  },
  btn: {
    style: {
      height: 45,
      minHeight: 45,
      marginTop: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelStyle: {
      fontWeight: 'initial',
      textTransform: 'initial',
    },
  },
  footer: {
    margin: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 10,
    marginRight: 5,
    textTransform: 'uppercase',
    color: 'rgba(29, 29, 38, 0.5)',
  },
  link: {
    fontSize: 10,
    color: '#1D1D26',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  progress: {
    display: 'flex',
    margin: 'auto',
    alignSelf: 'center',
  },
};
