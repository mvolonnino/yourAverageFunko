class User {
  constructor(uid, displayName, email, phoneNumber, photoUrl, providerId) {
    this.id = uid;
    this.displayName = displayName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.photoUrl = photoUrl;
    this.providerId = providerId;
  }
}

module.exports = User;
