// set needed CSS for the document
$('main').css({"padding-left":"16px", "overflow":"auto"});
$('body').css({"display":"flex", "flex-direction":"row", "padding":"0", "margin":"0", "box-sizing":"border-box", "height":"100%", "width":"100%"});
$('html').css("height", "100%");

// A unique ID is required for instantiation. 
// Supported Drawer Types are: "Temporary", "Persistent", "Permanent Above" and "Permanent Below".
class NavDrawer {
    constructor(ID, Type) {
        this.Label = "Title Text";
        this.ID = (typeof(ID) === "undefined") ? "NavDrawer" : ID;
        this.ParentID = ""
        this.Object = null;
        this.NavObject = null;
        this.MDCDrawer = null;
        this.Type = (typeof(Type) === "undefined") ? this.Type = "Temporary" : this.Type = Type;
    };

    // Creates the Nav Drawer.
    Create() {
        if (this.Object === null) {
            // Checks which version of a nav needs to be created.
            switch (this.Type.toString()) {
                default:
                    // The default is the temporary drawer.
                    this.Type = "Temporary";
                case "Temporary":
                    // Create and configure the elements.
                    var $MainElement = $('<aside>', {id: this.ID.toString(), "class": "mdc-temporary-drawer"});
                    var $NavTopLvL = $("<nav>", {"class": "mdc-temporary-drawer__drawer"});
                    var $Header = $("<header>", {"class": "mdc-temporary-drawer__header mdc-theme--primary-bg mdc-theme--text-primary-on-primary"});
                    var $HeaderContent = $("<div>", {"class": "mdc-temporary-drawer__header-content"}).text(this.Label.toString());
                    var $MenuContainer = $("<nav>", {"class":"mdc-temporary-drawer__content mdc-list-group"});
                    var $NavMenu = $("<div>", {"class": "mdc-list", id: this.ID.toString() + "-nav-menu"});
                    var AppendTo = (this.ParentID !== "") ? this.ParentID.toString() : "body";

                    // Send the elements to the document for rendering.
                    $(AppendTo).prepend($MainElement.append($NavTopLvL.append($Header.append($HeaderContent), $MenuContainer.append($NavMenu))));

                    // Instantiate the MDC component on the nav drawer to make interactive.
                    this.MDCDrawer = new mdc.drawer.MDCTemporaryDrawer($('#' + this.ID.toString())[0]);

                    // Make the main objects externally available.
                    this.Object = $MainElement;
                    this.NavObject = $NavMenu;
                    break;
                case "Persistent":
                    // Create and configure the elements.
                    var $MainElement = $('<aside>', {id: this.ID.toString(), "class" : "mdc-persistent-drawer"});
                    var $NavTopLvL = $('<nav>', {"class":"mdc-persistent-drawer__drawer"});
                    var $Spacer = $('<div>', {"class":"mdc-persistent-drawer__toolbar-spacer"});
                    var $NavContainer = $('<div>', {"class":"mdc-list-group"});
                    var $NavMenu = $('<nav>', {"class":"mdc-list", id: this.ID.toString() + "-nav-menu"});
                    var AppendTo = (this.ParentID !== "") ? this.ParentID.toString() : "body";

                    // Send the elements to the document for rendering.
                    $(AppendTo).prepend($MainElement.append($NavTopLvL.append($Spacer), $NavContainer.append($NavMenu)));

                    // Instantiate the MDC component on the nav drawer to make interactive.
                    this.MDCDrawer = new mdc.drawer.MDCPersistentDrawer($('#' + this.ID.toString())[0]);

                    // Make the main objects externally available.
                    this.Object = $MainElement;
                    this.NavObject = $NavMenu;
                    break;
                case "Permanent Above":
                    // Create and configure the elements.
                    var $MainElement = $('<nav>', {id: this.ID.toString(), "class": "mdc-permanent-drawer"});
                    var $Spacer = $('<div>', {"class":"mdc-permanent-drawer__toolbar-spacer"});
                    var $MenuContainer = $('<div>', {"class":"mdc-list-group"});
                    var $NavMenu = $('<nav>', {"class":"mdc-list", id: this.ID.toString() + "-nav-menu"});
                    var AppendTo = (this.ParentID !== "") ? this.ParentID.toString() : "body";

                    // Send the elements to the document for rendering.
                    $(AppendTo).prepend($MainElement.append($Spacer, $MenuContainer.append($NavMenu)));

                    // Make the main objects externally available.
                    this.Object = $MainElement;
                    this.NavObject = $NavMenu;
                    break;
                case "Permanent Below":
                    // Create and configure the elements.
                    var $MainElement = $('<nav>', {id: this.ID.toString(), "class": "mdc-permanent-drawer"});
                    var $MenuContainer = $('<div>', {"class":"mdc-list-group"});
                    var $NavMenu = $('<nav>', {"class":"mdc-list", id: this.ID.toString() + "-nav-menu"});
                    var AppendTo = (this.ParentID !== "") ? this.ParentID.toString() : "body";

                    // Send the elements to the document for rendering.
                    $(AppendTo).prepend($MainElement.append($MenuContainer.append($NavMenu)));

                    // Make the main objects externally available.
                    this.Object = $MainElement;
                    this.NavObject = $NavMenu;
                    break;
            }
            return true;
        } else {
            console.error("There is already an object here. Are you reusing the same instance of the NavDrawer class?");
            return false;
        }
    }

    // Remove the Nav Drawer.
    Remove() {
        // Only execute if the MenuItem has been created.
        // Throw an error if it does not exist.
        if (this.Object !== null) {
            this.Object.remove();
            this.Object = null;
            this.MDCDrawer = null;
            this.NavObject = null;
            return true;
        } else {
            console.error("Can't remove the NavDrawer, it most likely does not exist.");
            return false;
        }
    }

    // Attaches a Menu Item object to the menu.
    // Add a ripple to the new menu item if the second parameter is true.
    AttachMenuItem(MenuItem, RippleBool) {
        if (MenuItem.Identifier() === "Menu Item") {
            $(this.NavObject).append(MenuItem.Object);
            if (RippleBool) {
                mdc.ripple.MDCRipple.attachTo(MenuItem.Object[0]);
            } 
            return true;
        } else {
            console.error("Please attach a MenuItem object!");
            return false;
        }
    }

    // Removes a Menu Item object from the menu.
    RemoveMenuItem(MenuItem) {
        if (MenuItem.Identifier() === "Menu Item") {
            MenuItem.Object.remove();
            return true;
        } else {
            console.error("Please remove a MenuItem object!");
            return false;
        }
    }

    // Opens the nav drawer
    // Returns true if successful.
    // Returns false if unsuccessful.
    ToggleOpenClose() {
        if (this.Object !== null) {
            if (this.MDCDrawer.open) {
                this.MDCDrawer.open = false;
            } else {
                this.MDCDrawer.open = true;
            }
            return true;
        } else {
            return false;
        }
    }

    // A method that returns the type of the Class.
    Identifier() {
        return "Navigation Drawer";
    }
}

class MenuItem {
    // Sets up the class with the default values.
    constructor(ID, Label, Icon) {
        this.Label = (typeof(Label) === "undefined") ? "Menu Item" : Label.toString();
        this.Icon = (typeof(Icon) === "undefined") ? "receipt" : Icon.toString();
        this.ID = (typeof(ID) === "undefined") ? "" : ID.toString();
        this.HREF = "";
        this.OnClick = "";
        this.ParentID = "";
        this.Object = null;
    }

    // Create a Menu Item Instance.
    Create() {
        if (this.Object == null) {
            // Create the HTML elements 
            let $MainElement = $('<a>', {"class" : "mdc-list-item"}).text(this.Label);
            let $IconElement = $('<i>', {"class" : "material-icons mdc-list-item__start-detail"}).text(this.Icon);

            // If the ID attribute has been set, apply it.
            if (this.ID !== "") {
                $MainElement.attr("id", this.ID); 
            }

            // Change the URL of the Menu Item if it is not blank.
            if (this.HREF !== "") {
                $MainElement.attr("href", this.HREF.toString());
            }

            // Add an HTML onclick attribute to the main element.
            if (this.OnClick !== "") {
                $MainElement.attr("onclick", this.OnClick.toString());
            }

            // If a parent ID is specified, attach it there, otherwise just create the object.
            if (this.ParentID === "") {
                $MainElement.prepend($IconElement);
            } else {
                $('#' + this.ParentID.toString()).append($MainElement.prepend($IconElement));
            }

            // Set the Object property with the results of the above code.
            this.Object = $MainElement;
            return true;   
        } else {
            // Spit out an error if something went wrong.
            console.error("There is already an object here. Are you reusing the same instance of the MenuItem class?");
            return false;
        }
    }

    // Remove the Menu Item.
    Remove() {
        // Only execute if the MenuItem has been created.
        // Throw an error if it does not exist.
        if (this.Object !== null) {
            this.Object.remove();
            this.Object = null;
            return true;
        } else {
            console.error("Can't remove the NavDrawer, it most likely does not exist.");
            return false;
        }
    }

    // Manually create a ripple effect on the Menu Item Object.
    ManualRipple() {
        if (this.Object !== null) {
            mdc.ripple.MDCRipple.attachTo(this.Object);
            return true;
        } else {
            console.error("Can't instantiate a ripple. Has the item been created yet?")
            return false;
        }
    }

    // A method that returns the type of the Class.
    Identifier() {
        return "Menu Item";
    }
}

class Toolbar {
    constructor(ID, Type, Label) {
        this.Label = "Toolbar!";
        this.ID = (typeof(ID) === "undefined") ? "" : ID;
        this.Type = Type;
        this.Object = null;
    }

    // Creates the Toolbar.
    Create() {
        if (this.Object === null) {
            // pass
        }
    }

    // Remove the Toolbar.
    Remove() {
        if (this.Object !== null) {
            // Pass
        }
    }

    // A method that returns the type of the Class.
    Identifier() {
        return "Toolbar";
    }
}