import {AmplifyTheme} from 'aws-amplify-react'

// UI styling

const myFormSection = Object.assign({}, AmplifyTheme.formSection, {
  width: '300px',
  position: 'absolute',
  top: '100px',
  right: '35px',
  left: '35px',
  border: 'none'
})

const mySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, {
  background: 'black',
  color: 'white',
  fontWeight: '600',
  fontSize: '15px'
})

const mySignInButton = Object.assign({}, AmplifyTheme.signInButton, {
  width: '80%'
})

const myA = Object.assign({}, AmplifyTheme.a, {
  color: 'black'
})

const MyTheme = Object.assign({}, AmplifyTheme, {
  formSection: myFormSection,
  sectionHeader: mySectionHeader,
  a: myA,
  signInButton: mySignInButton
})

export default MyTheme
