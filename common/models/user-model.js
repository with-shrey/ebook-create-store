'use strict';

module.exports = function(UserModel) {
  UserModel.remoteMethod('markBookRead', {
    accepts: [
      {arg: 'id', type: 'string', required: true}, // get the id of the frog to save image to
      {arg: 'bookId', type: 'string', required: true}, // pass the request object to remote method
    ],
    returns: {root: true, type: 'object'},
    http: {path: '/:id/markBookRead', verb: 'post'},
  });
  UserModel.markBookRead = async function upload(id, bookId) {
    const userBook = await UserModel.app.models.UserBookProgress.findOne({
      where: {
        booksId: bookId,
        userModelId: id,
      },
    });
    console.log(userBook);
    if (!userBook) {
      return UserModel.app.models.UserBookProgress.create({
        userModelId: id,
        booksId: bookId,
      });
    } else {
      return Promise.resolve(userBook);
    }
  };
};
