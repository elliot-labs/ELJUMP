// Initialize the Material Design components
mdc.autoInit();

class NavDrawer {
    constructor(titleText, ID) {
      this.titleText = titleText;
      this.ID = ID;
      this.object = null;
      this.MDCDrawer = null;
    };

    // Creates the temporary nav drawer.
    Create() {
        var $aside = $('<aside />', {id: this.ID.toString(), "class": "mdc-temporary-drawer"});
        let $navHeader = $("<nav>", {"class": "mdc-temporary-drawer__drawer"});
        let $header = $("<header>", {"class": "mdc-temporary-drawer__header"});
        let $headerContent = $("<div>", {"class": "mdc-temporary-drawer__header-content"}).text(this.titleText.toString());
        let $navMenu = $("<nav>", {"class": "mdc-temporary-drawer__content mdc-list", id: this.ID.toString() + "-nav-menu"});

        $header.append($headerContent);
        $('body').prepend($aside.append($navHeader, $header, $navMenu));
        this.MDCDrawer = new mdc.drawer.MDCTemporaryDrawer($('#' + this.ID.toString())[0]);

        this.object = $aside;
    }

    // Returns true if successful.
    // Returns false if unsuccessful.
    Remove() {
        if (this.object !== null) {
            this.object.remove();
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
        if (this.object !== null) {
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