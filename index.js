/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (privateProps, objects) => {
  return objects.map((item) => {
    privateProps.forEach((prop) => {
      delete item[prop];
    });
    return item;
  });
};

exports.excludeByProperty = (property, objects) => {
  return objects.filter((item) => !item.hasOwnProperty(property));
};

exports.sumDeep = (objectsArray) => {
  return objectsArray.map((item) => {
    const sum = item.objects.reduce((total, cur) => total + cur.val, 0);
    return { objects: sum };
  })
};

exports.applyStatusColor = (colorMap, statusArray) => {
  const statusToColor = {};

  // colorMap change to: status → color
  for (const [color, codeArray] of Object.entries(colorMap)) {
    for (const code of codeArray) {
      statusToColor[code] = color;
    }
  }

  return statusArray.map((item) => {
    const color = statusToColor[item.status];
    if (!color) return null;
    return {
      ...item,
      color: statusToColor[item.status]
    }
  }).filter(Boolean);
};

exports.createGreeting = (greet, greeting) => {
  return function (name) {
    return greet(greeting, name);
  }
};

exports.setDefaults = (defaultProps) => {
  return function (obj) {
    return {
      ...defaultProps,
      ...obj
    }
  }
};

exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  // get the user list
  const userList = await services.fetchUsers();

  // find the specified user
  const user = userList.find(item => item.name === name);
  if (!user) {
    throw new Error(`User with name ${name} not found`);
  }

  // get the company and status
  const [company, status] = await Promise.all([
    services.fetchCompanyById(user.companyId),
    services.fetchStatus(),
  ]);

  return {
    user,
    company,
    status,
  };
};
