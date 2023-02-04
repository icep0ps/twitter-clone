class Author {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.profileURL = `/profiles/${id}`;
  }
}

export default Author;
