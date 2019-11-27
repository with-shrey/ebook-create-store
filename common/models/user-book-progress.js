'use strict';

module.exports = function(UserBookProgress) {
  UserBookProgress.observe('after save', async function(ctx, next) {
    let id;
    if (ctx.instance) {
      id = ctx.instance.id;
    } else {
      id = ctx.where.id;
    }
    console.log({id});
    if (id) {
      const progress = await UserBookProgress.findOne({
        where: {
          id,
        },
      });
      console.log({progress});
      const ratings = await UserBookProgress.find({
        where: {
          booksId: progress.booksId,
        },
        fields: 'rating',
      });

      const rating = ratings.reduce((total, num) => {
        return {rating: total.rating + num.rating}; // returns object with property x
      }).rating / ratings.length;
      console.log({rating});
      await UserBookProgress.app.models.Books.update({
        id: progress.booksId,
      }, {
        rating: rating ? rating : 0,
      });
      return Promise.resolve();

    }
  });

};
