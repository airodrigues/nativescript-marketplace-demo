// import trace = require("trace");
// trace.setCategories(trace.categories.Layout);
// trace.enable();
import frame = require("ui/frame");
import exampleBase = require("./examples/example-base-page");
import application = require("application");

if (application.ios) {
    application.on("launch", args => {
        // TODO: It would be nice if this was ios-specific property on the action bar and static property on application.ios.
        UIApplication.sharedApplication().statusBarStyle = UIStatusBarStyle.UIStatusBarStyleLightContent;
        setTimeout(() => {
            UIApplication.sharedApplication().keyWindow.backgroundColor = UIColor.blackColor();
        }, 1);
    });
}

application.mainModule = "views/main-page";

application.on("launch", () => {
    if (application.android) {
        // Plug in to handle do a doble back navigation in Android
        application.android.on("activityBackPressed", (args) => {
            if (frame.topmost().currentPage instanceof exampleBase.ExamplePage) {
                frame.goBack();
                frame.goBack();
                args.cancel = true;
            }
        })
    }
})

application.start();
