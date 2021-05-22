var express = require("express");
var router = express.Router({ mergeParams: true });
var product = require("../models/product");
var comments = require("../models/comment");
const auth=require('../middlewares/authenticate')
var controller = require("../controllers/cmntCtrl");

// new comment
router.get("/new", controller.isLoggedIn, (req, res) => {
  product.findById(req.params.id, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { product: found });
    }
  });
});

// comment create
router.post("/", controller.isLoggedIn, (req, res) => {
  product.findById(req.params.id, (err, found) => {
    if (err) {
      console.log(err);
      res.redirect("/products");
    } else {
      comments.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash("error", "something went wrong");
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.text=req.body.text;
          comment.save();
          found.comments.push(comment);
          found.save();
          req.flash("success", "Successfully created the comment");
          res.redirect("/products/" + req.params.id);
        }
      });
    }
  });
});

//likes & dislikes
//router.post('/:comment_id/likes',auth,controller.like);
//router.post('/:comment_id/dislikes',auth,controller.dislike);

// edit form
router.get(
  "/:comment_id/edit",
  controller.checkCommentsOwnerShip,
  function (req, res) {
    product.findById(req.params.id, function (err, found_camp) {
      if (err || !found_camp) {
        req.flash("error", "product not found");
        res.redirect("back");
      } else {
        comments.findById(req.params.comment_id, function (err, found) {
          if (err || !found) {
            req.flash("error", "comment not found");
            res.redirect("back");
          } else {
            res.render("comments/edit", {
              comment: found,
              product_id: req.params.id,
            });
          }
        });
      }
    });
  }
);
//update form
router.put(
  "/:comment_id",
  controller.checkCommentsOwnerShip,
  function (req, res) {
    comments.findByIdAndUpdate(
      req.params.comment_id,
      req.body.comment,
      function (err, updatedOne) {
        if (err) {
          res.redirect("back");
        } else {
          res.redirect("/products/" + req.params.id);
        }
      }
    );
  }
);
// comments destroyer

router.delete(
  "/:comment_id",
  controller.checkCommentsOwnerShip,
  function (req, res) {
    comments.findByIdAndRemove(req.params.comment_id, function (err) {
      if (err) {
        res.redirect("back");
      } else {
        req.flash("error", "comment deleted!");
        res.redirect("/products/" + req.params.id);
      }
    });
  }
);

module.exports = router;