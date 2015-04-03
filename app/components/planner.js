// React
var React = require("react");
var Recipe = require("./recipe");
var RecipeStore = require("../stores/recipe-store");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// Component
function getState() {
  return {
    store: RecipeStore.getRecipes()
  };
}

var Recipes = React.createClass({
  displayName: "Recipes",
  mixins: [RecipeStore.mixin],

  getInitialState: function () {
    return getState();
  },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  createRecipeNodes: function () {
    var nodes = this.state.store.map(function (recipe) {
      return (
      <div className="recipe">
        <p>
          <Link to="RecipeDetails" params={{_id: recipe._id}}>
            {recipe.title}
          </Link>
          &nbsp;
          <input type="text" />
        </p>
        <RouteHandler />
      </div>
    );
    });
    return nodes;
  },

  onChange: function () {
    this.setState(getState());
  },

  render: function () {
    var recipeNodes = this.createRecipeNodes();

    return (
      <div className="Recipes">
        <p className="Recipes-title">Recipe Bank:</p>
        {recipeNodes}
      </div>
    );
  }
});

module.exports = Recipes;