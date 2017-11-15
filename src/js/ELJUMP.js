// Initialize the Material Design components
mdc.autoInit();

class NavDrawer {
    constructor(TitleText, ID, Type) {
      this.TitleText = TitleText;
      this.ID = ID;
      this.Object = null;
      this.MDCDrawer = null;
      if (typeof(Type) === "undefined") {
        this.Type = "Temporary";
      } else {
        this.Type = Type;
      }
    };

    // Creates the Nav Drawer.
    Create() {
        if (this.Object === null) {
            // Checks which version of a nav needs to be created.
            switch (this.Type.toString()) {
                default:
                    this.Type = "Temporary";
                // The default is the temporary drawer.
                case "Temporary":
                    var $aside = $('<aside>', {id: this.ID.toString(), "class": "mdc-temporary-drawer"});
                    var $navTopLvL = $("<nav>", {"class": "mdc-temporary-drawer__drawer"});
                    var $header = $("<header>", {"class": "mdc-temporary-drawer__header mdc-theme--primary-bg mdc-theme--text-primary-on-primary"});
                    var $headerContent = $("<div>", {"class": "mdc-temporary-drawer__header-content"}).text(this.TitleText.toString());
                    var $navMenu = $("<nav>", {"class": "mdc-temporary-drawer__content mdc-list", id: this.ID.toString() + "-nav-menu"});
        
                    $('body').prepend($aside.append($navTopLvL.append($header.append($headerContent), $navMenu)));
                    this.MDCDrawer = new mdc.drawer.MDCTemporaryDrawer($('#' + this.ID.toString())[0]);
            
                    this.Object = $aside;
                    break;
                case "Persistent":
                    var $aside = $('<aside>', {id: this.ID.toString(), "class": "mdc-persistent-drawer"});
                    var $navTopLvL = $("<nav>", {"class": "mdc-persistent-drawer__drawer"});
                    var $spacer = $('<div>', {"class": "mdc-persistent-drawer__toolbar-spacer"});
                    var $listGroup = $("<div>", {"class": "mdc-list-group"});
                    var $listContent = $("<nav>", {"class": "mdc-list"});
                    var $listDivider = $("<hr>", {"class": "mdc-list-divider"});
                    var $listContent2 = $("<nav>", {"class": "mdc-list"});

                    $('body').prepend($aside.append($navTopLvL.append($spacer, $listGroup.append($listContent, $listDivider, $listContent2))));
                    this.MDCDrawer = new mdc.drawer.MDCPersistentDrawer($('#' + this.ID.toString())[0]);
                    this.Object = $aside;

                    var $item1 = $('<a>', {href: "#", "class": "mdc-list-item"}).text("Send Mail");
                    var $item1meta = $('<i>', {"class": "material-icons mdc-list-item__start-detail"}).text("send");
                    $item1.prepend($item1meta.attr("aria-hidden", "true"));
                    $listContent.append($item1);

                    var $item2 = $('<a>', {href: "#", "class": "mdc-list-item"}).text("Drafts");
                    var $item2meta = $('<i>', {"class": "material-icons mdc-list-item__start-detail"}).text("drafts");
                    $item2.prepend($item1meta.attr("aria-hidden", "true"));
                    $listContent2.append($item2);
                    
                    break;
                case "Permanent Above":
                    break;
                case "Permanent Below":
                    break;
            }
            return true;
        } else {
            return false;
        }
    }

    // Returns true if successful.
    // Returns false if unsuccessful.
    Remove() {
        if (this.Object !== null) {
            this.Object.remove();
            this.Object = null;
            this.MDCDrawer = null;
            return true;
        } else {
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
  }

class Toolbar {
    constructor(TitleText, ID, Type) {
        this.TitleText = "Toolbar!";
        this.ID = ID;
        this.Type = Type;
        this.Object = null;
    }

    // Creates the Toolbar.
    Create() {
        if (this.Object === null) {
            // Create toolbar here
        }
    }
}