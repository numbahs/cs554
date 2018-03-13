module.exports = {
  getById = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (hasProject) {
          resolve(project);
        } else {
          reject(new Error("something went wrong"));
        }
      }, 5000);
    });
  }
}