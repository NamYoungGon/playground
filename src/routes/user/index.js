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
      const result = await user.save()

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

module.exports = {
  register,
  login
}