const fn = (name, org) => {
  if (name === 'org_name') {
    console.log('This is org name', 'org_name');
  }

  if (name === 'org_name') {
    console.log('Name is equal', 'org_name');
  }

  if (org === 'org_name') {
    console.log('Organisation name is:', 'org_name');
  }

  while (1 === 2) {
    console.log('Loop');
  }
}

export default fn;