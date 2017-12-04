// set needed CSS for the document
$('main').css({"padding-left":"16px", "overflow":"auto"});
$('body').css({"display":"flex", "flex-direction":"row", "padding":"0", "margin":"0", "box-sizing":"border-box", "height":"100%", "width":"100%"});

// A unique ID is required for instantiation. 
// Supported drawer types are: "Temporary", "Persistent", "Permanent Above" and "Permanent Below".
class NavDrawer {
    // Sets up the class with the default values.
    constructor(ID, Type) {
        this.Label = "Title Text";
        this.ID = (typeof(ID) === "undefined") ? "NavDrawer" : ID;
        this.ParentID = "";
        this.Object = null;
        this.NavObject = null;
        this.MDCObject = null;
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
                    var ParentElement = (this.ParentID !== "") ? this.ParentID.toString() : "body";

                    // Send the elements to the document for rendering.
                    $(ParentElement).prepend($MainElement.append($NavTopLvL.append($Header.append($HeaderContent), $MenuContainer.append($NavMenu))));

                    // Instantiate the MDC component on the nav drawer to make interactive.
                    this.MDCObject = new mdc.drawer.MDCTemporaryDrawer($MainElement[0]);

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
                    this.MDCObject = new mdc.drawer.MDCPersistentDrawer($MainElement[0]);

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
            this.MDCObject = null;
            this.NavObject = null;
            return true;
        } else {
            console.error("Can't remove the NavDrawer, it does not exist...");
            return false;
        }
    }

    // Attaches a Menu Item object to the menu.
    AttachMenuItem(MenuItem) {
        if (MenuItem.constructor.name === "MenuItem") {
            $(this.NavObject).append(MenuItem.Object);
            return true;
        } else {
            console.error("Please attach a MenuItem object!");
            return false;
        }
    }

    // Removes a Menu Item object from the menu.
    RemoveMenuItem(MenuItem) {
        if (MenuItem.constructor.name === "Menu Item") {
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
            if (this.MDCObject.open) {
                this.MDCObject.open = false;
            } else {
                this.MDCObject.open = true;
            }
            return true;
        } else {
            return false;
        }
    }
}

// Creates a menu item for the nav drawer.
class MenuItem {
    // Sets up the class with the default values.
    constructor(ID, Label, Icon) {
        this.Label = (typeof(Label) === "undefined") ? "Menu Item" : Label.toString();
        this.Icon = (typeof(Icon) === "undefined") ? "receipt" : Icon.toString();
        this.ID = (typeof(ID) === "undefined") ? "" : ID.toString();
        this.Ripple = false;
        this.HREF = "";
        this.OnClick = "";
        this.ParentID = "";
        this.Object = null;
        this.MDCObject = null;
    }

    // Create a Menu Item Instance.
    Create() {
        // Only execute if the object has not been created.
        if (this.Object == null) {
            // Create the HTML elements 
            let $MainElement = $('<a>', {"class" : "mdc-list-item"}).text(this.Label);
            let $IconElement = $('<i>', {"class" : "material-icons mdc-list-item__start-detail"}).text(this.Icon);

            // If the ID attribute has been set, apply it.
            if (this.ID !== "") $MainElement.attr("id", this.ID);

            // Change the URL of the Menu Item if it is not blank.
            if (this.HREF !== "") $MainElement.attr("href", this.HREF.toString());

            // Add an HTML onclick attribute to the main element.
            if (this.OnClick !== "") $MainElement.attr("onclick", this.OnClick.toString());

            // If a parent ID is specified, attach it there, otherwise just create the object.
            if (this.ParentID === "") {
                $MainElement.prepend($IconElement);
            } else {
                $('#' + this.ParentID.toString()).append($MainElement.prepend($IconElement));
            }

            // Create a ripple effect if it is enabled in the class.
            if (this.Ripple) mdc.ripple.MDCRipple.attachTo($MainElement[0]);

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
        // Only execute if the object has been created.
        if (this.Object !== null) {
            // Remove the object from the DOM.
            this.Object.remove();
            // Reset the properties for a new creation of the menu item.
            this.Object = null;
            this.MDCObject = null;
            // Return true for error checking.
            return true;
        } else {
            // If the object has not been instantiated, quit execution and give reason.
            console.error("Can't remove the menu item, it does not exist yet...");
            return false;
        }
    }

    // Manually create a ripple effect on the Menu Item Object.
    ManualRipple() {
        // Only execute if the object has been created.
        if (this.Object !== null) {
            // only execute if MDC has not been enabled on the object yet.
            if (this.MDCObject === null) {
                // Create ripple on the object and save it to the class MDC object property.
                this.MDCObject = mdc.ripple.MDCRipple.attachTo(this.Object[0]);
                return true;
            } else {
                // If the MDC object has been instantiated, quit execution and give reason.
                console.error("The MDC component is already initialized. Not applying the ripple for safety...");
                return false;
            }
        } else {
            // If the Object has not been instantiated, quit reason and give the reason.
            console.error("Can't instantiate a ripple. The menu item has not been created yet...")
            return false;
        }
    }
}

// A unique ID is required for instantiation. 
// Supported toolbar types are: "Fixed", "Waterfall", "Waterfall Flexible" and "Waterfall Fix Last Row".
class Toolbar {
    // Sets up the class with the default values.
    constructor(ID, Type, Title) {
        this.Title = (typeof(Title) === "undefined") ? "" : Title;
        this.Label = "";
        this.ShrinkToFit = false;
        this.ID = (typeof(ID) === "undefined") ? "" : ID;
        this.Type = (typeof(Type) === "undefined") ? this.Type = "Waterfall" : this.Type = Type;
        this.ParentID = "";
        this.Object = null;
        this.MDCObject = null;
    }

    // Creates the Toolbar.
    Create() {
        // Only execute if the object has not been created.
        if (this.Object === null) {
            $("main").addClass("mdc-toolbar-fixed-adjust");

            // Create the reuseable toolbar element structure.
            var $MainElement = $('<header>', {id: this.ID.toString(), "class": "mdc-toolbar"});
            var $ToolbarRow = $('<div>', {"class": "mdc-toolbar__row"});
            var $LeftSection = $('<section>', {id: this.ID.toString() + "-left-section", "class": "mdc-toolbar__section mdc-toolbar__section--align-start"});
            var $CenterSection = $('<section>', {id: this.ID.toString() + "-center-section", "class": "mdc-toolbar__section"});
            var $RightSection = $('<section>', {id: this.ID.toString() + "-right-section", "class": "mdc-toolbar__section mdc-toolbar__section--align-end"});
            if (this.Title !== "") {
                var $ToolbarTitle = $('<span>', {"class": "mdc-toolbar__title"}).text(this.Title.toString());
                $LeftSection.append($ToolbarTitle);
            }
            if (this.Label !== "") {
                var $ToolbarLabel = $('<span>', {"class": "mdc-toolbar__title"}).text(this.Label.toString());
                $CenterSection.append($ToolbarLabel);
            }
            if (this.ShrinkToFit) {
                $LeftSection.addClass("mdc-toolbar__section--shrink-to-fit");
                $RightSection.addClass("mdc-toolbar__section--shrink-to-fit");
            }

            // Get the parent element and make accessible.
            var ParentElement = (this.ParentID !== "") ? this.ParentID.toString() : "body";
            $(ParentElement).prepend($MainElement.append($ToolbarRow.append($LeftSection, $CenterSection, $RightSection)));

            // Make customizations to the toolbar to change it to specific types of toolbars.
            switch (this.Type.toString()) {
                default:
                    // The default is the Waterfall Toolbar.
                    this.Type = "Waterfall";
                    console.error('The specified type does not exist: ' + this.Type.toString() + ', defaulting to "Waterfall".');
                case "Waterfall":
                    $MainElement.addClass("mdc-toolbar--fixed mdc-toolbar--waterfall");
                    break;
                case "Waterfall Flexible":
                    $MainElement.addClass("mdc-toolbar--fixed mdc-toolbar--waterfall mdc-toolbar--flexible mdc-toolbar--flexible-default-behavior");
                    break;
                case "Fixed":
                    $MainElement.addClass("mdc-toolbar--fixed");
                    break;
            }
            // Automatically correct padding for toolbar on the main content.      
            this.MDCObject = new mdc.toolbar.MDCToolbar.attachTo($MainElement[0]);
            this.MDCObject.fixedAdjustElement = $("main")[0];
            this.Object = $MainElement;
            return true;
        } else {
            // If the object has been instantiated, quit execution and give reason.
            console.error("Could not create, It appears that the toolbar has already been created.");
            return false;
        }
    }

    // Remove the Toolbar.
    Remove() {
        // Only execute if the object has been created.
        if (this.Object !== null) {
            $("main").removeClass("mdc-toolbar-fixed-adjust");
            this.Object.remove();
            this.Object = null;
            this.MDCObject = null;
        }
    }

    // Attach an item to the toolbar.
    // the first item is the object itself.
    // Second parameter is the location on the toolbar where the item will reside,
    // valid positions are: "left", "center" and "right".
    AttachItem(ItemToAttach, Position) {
        if (this.Object !== null) {
            if (ItemToAttach.constructor.name === "Button") {
                switch (Position.toString()) {
                    case "left":
                        $("#"+ this.ID.toString() + "-left-section").append(ItemToAttach.Object[0]);
                        return true;
                        break;
                    case "center":
                        $("#"+ this.ID.toString() + "-center-section").append(ItemToAttach.Object[0]);
                        return true;
                        break;
                    case "right":
                        $("#"+ this.ID.toString() + "-right-section").append(ItemToAttach.Object[0]);
                        return true;
                        break;
                    default:
                        console.log("The specified position does not exist...");
                        return false;
                        break;
                }
            } else {
                console.log("The type of object trying to be attach is not supported.");
                return false;                
            }
            return true;
        } else {
            console.error("Could not attach new item, the toolbar has not been created yet...");
            return false;
        }
    }
}

// A unique ID is not required but recommended.
// Supported button types are "Flat" and "Raised"
class Button {
    // Sets up the class with the default values.
    constructor(ID, Type, Label, Icon) {
        this.Label = (typeof(Label) === "undefined") ? "Button" : Label;
        this.Icon = (typeof(IconID) === "undefined") ? "" : Icon;
        this.OnClick = "";
        this.Ripple = true;
        this.ID = (typeof(ID) === "undefined") ? "" : ID;
        this.Type = (typeof(Type) === "undefined") ? this.Type = "Waterfall" : this.Type = Type;
        this.ParentID = "";
        this.Object = null;
        this.MDCObject = null;
    }

    // Create the button.
    Create() {
        // Only execute if the object has not been created.
        if (this.Object === null) {
            // Create the main element.
            var $MainElement = $('<button>', {"class": "mdc-button"});

            // Import the parent element.
            var ParentElement = $('#' + this.ParentID.toString());

            // Configure the main element.
            if (this.ID.toString() !== "") $MainElement.id = this.ID.toString();
            if (this.Label.toString() !== "") $MainElement.text(this.Label.toString());
            if (this.OnClick.toString() !== "") $MainElement.attr("OnClick", this.OnClick.toString()); 

            // Create icon element, configure and attach to the main element.
            if (this.Icon.toString() !== "") {
                $IconElement = $('<i>', {"class": "material-icons mdc-button__icon"}).text(this.Icon.toString());
                $MainElement.prepend($IconElement);
            }

            // Apply the selected type to the button.
            switch (this.Type.toString()) {
                default:
                    console.error('The specified type does not exist: ' + this.Type.toString() + ', defaulting to "Raised".');
                    this.Type = "Raised";
                case "Raised":
                    $MainElement.addClass("mdc-button--raised");
                    break;
                case "Flat":
                    break;
            }

            // Send the main element to the parent element for rendering.
            ParentElement.append($MainElement);

            // Only apply ripple if enabled.
            if (this.Ripple) this.MDCObject = mdc.ripple.MDCRipple.attachTo($MainElement[0]);

            // Set the main element to be accessible.
            this.Object = $MainElement;
            return true;
        } else {
            // If the object has been instantiated, quit execution and give reason.
            console.error("Could not create, It appears that the button has already been created.");
            return false;
        }
    }

    // Remove the button.
    Remove() {
        // Only execute if the object has been created.
        if (this.Object !== null) {
            // Remove the object from the DOM.
            this.Object.remove();
            // Reset the properties for a new creation of the button.
            this.Object = null;
            this.MDCObject = null;
            // Return true for error checking.
            return true;
        } else {
            // If the object has not been instantiated, quit execution and give reason.
            console.error("Can't remove the button, it does not exist yet...");
            return false;
        }
    }

    // Toggles the button state and optionally sets it to a specific value.
    // Optionally if a value is passed to it, it will set it to the bool value of the passed object.
    ToggleDisabled(OptionalValue) {
        // Only execute if the object has been created.
        if (this.Object !== null) {
            // If the optional parameter is specified, toggle the button's state to the specified value.
            if (typeof(OptionalValue) !== "undefined") {
                if (OptionalValue) {
                    // Disable the button.
                    this.Object.attr("disabled", "");
                } else {
                    // Enable the button.
                    this.Object.removeAttr("disabled");
                }
            // If the optional parameter is not specified, toggle the buttons state to the opposite of the current state.
            } else {
                // Checks the current button state and executes based upon that.
                if (this.Object.attr("disabled") === "") {
                    // Disable the button.
                    this.Object.removeAttr("disabled");
                } else {
                    // Enable the button.
                    this.Object.attr("disabled", "");
                }
            }
        }
    }

    // Manually create a ripple effect on the Menu Item Object.
    ManualRipple() {
        // Only execute if the object has been created.
        if (this.Object !== null) {
            // only execute if MDC has not been enabled on the object yet.
            if (this.MDCObject === null) {
                // Create ripple on the object and save it to the class MDC object property.
                this.MDCObject = mdc.ripple.MDCRipple.attachTo(this.Object[0]);
                return true;
            } else {
                // If the MDC object has been instantiated, quit execution and give reason.
                console.error("The MDC component is already initialized. Not applying the ripple for safety...");
                return false;
            }
        } else {
            // If the Object has not been instantiated, quit reason and give the reason.
            console.error("Can't instantiate a ripple. The menu item has not been created yet...")
            return false;
        }
    }
}