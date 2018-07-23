/**
 * 회원가입
 */
async function register(req, res) {
  const database = req.app.get('database');
  const {
    email,
    password,
    nickname
  } = req.body;

  if (database) {
    try {
      const user = new database.UserModel({ email, password, nickname });
      const result = await user.save();

      if (result) {
        res.json({
          success: true
        });
      }
    } catch (e) {
      res.json({
        success: false
      });
    }
  } else {
    res.json({
      success: false
    });
  }
}

/**
 * 로그인
 */
async function login(req, res) {
  const database = req.app.get('database');
  const {
    email,
    password
  } = req.body;

  if (database) {
    try {
      const result = await database.UserModel.findByEmail(email);

      if (result) {
        let authenticated = false;

        const user = new database.UserModel({ email });
        authenticated = user.authenticate(password, result);

        if (authenticated) {
          res.cookie('playground', JSON.stringify({
            email,
            authorized: true
          }));

          res.json({
            success: true
          });

        } else {
          res.json({
            success: false
          });
        }
      }
    } catch (e) {
      res.json({
        success: false
      });
    }
  } else {
    res.json({
      success: false
    });
  }
}

/**
 * 로그인 (자동 로그인)
 */
function login_auto(req, res) {
  const database = req.app.get('database');

  if (database) {
    const cookiePlayground = req.cookies.playground;
    if (cookiePlayground) {
      const userObj = JSON.parse(cookiePlayground);
      res.json({
        success: true
      });
    } else {
      res.json({
        success: false
      });
    }
  } else {
    res.json({
      success: false
    });
  }
}

/**
 * 로그아웃
 */
function logout(req, res) {
  res.clearCookie('playground');

  res.json({
    success: true
  });
}

module.exports = {
  register,
  login,
  login_auto,
  logout
}