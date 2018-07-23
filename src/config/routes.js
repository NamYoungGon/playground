module.exports = [
  {
    file: './user',
    path: '/api/user/register',
    method: 'register',
    type: 'post'
  },
  {
    file: './user',
    path: '/api/user/login',
    method: 'login',
    type: 'post'
  },
  {
    file: './user',
    path: '/api/user/login',
    method: 'login_auto',
    type: 'get'
  },
  {
    file: './user',
    path: '/api/user/logout',
    method: 'logout',
    type: 'get'
  },
]