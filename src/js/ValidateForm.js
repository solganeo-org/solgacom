class ValidateForm {
  static validatePassword(password, confirmPassword) {
    if (password === confirmPassword) return true
    return false
  }

  static validateEmail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
  }
}

export default ValidateForm
