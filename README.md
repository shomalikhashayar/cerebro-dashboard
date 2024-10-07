v 0.0.1 test

## basic commands

#### `npm start`
Runs the production mode.
 
## `npm develope`
runs project for development so that you can see and change.  

---
# Development
consider this guide before making any changes to the code.

tools used:
 - ui: [`antd`](https://ant.design/)
 - network: [`axios`](https://github.com/axios/axios)

## New Page
The dashboard is made out of pages and each page functions separately. there are few pages that still not developed, you can add the component `FutureDevelopmentCenter.jsx` for showing info to user.

Just add a new `Route` in `App.js` and consider a unique path starting with `/` and lowercased. in order to add it's link to side menu, open `./utils/sidebarLinks.js` and add necessary information to it. also make sure to add it to the top of the page for loading it's icon and title in the page.

## Header
Heder will never hide. you can use it's tools like `sort` and `filter` for any page you need. it's information is passed through `ContextProviderHeader.js` and is accessible anywhere in the app. the only part works independently from header context is `Profile` which does not need context and runs on it's own. the information is set to local storage and read when it's opened. 

## List Items
Each page which is loading events (e.g. `Anomaly`,`Face`and etc) has two types of list items. any event type (currently `anomaly`,`face` and `plate`) is determined in it. make sure to check each part dependent on `type`. `anomaly` events has video content while other has image content.
### List Item Top
The top item has a different UI and designed to show last event on the list.
### List Item (expandable)
This item works similar as list item top with different UI that is capable of expanding. the information for both items is identical if you want to change one, make sure to change both UI too.

## Control
This part is a little bit tricky. make sure to understand the model then make any changes.

each part (e.g. `account`,`face`,...) has 3 main functions.
1. create
2. update (change)
3. delete

for handling each of these functions there are 4 subparts each of which handle a single task. all control parts are in `./pages/Control` folder and some of the operations need more management so they have `subparts`. each sub operation has some subparts. there is a main file handling all parts which named by it. for example `Control_NewAccount.jsx` is the file for managing creating,updating and deleting accounts which it's subparts are inside `account` folder. others like `Zone` did not need that much of handling so everything is in a single file. at last every control file integrated in `Control.jsx` file which is handles control page.

### Subparts
for example for account part we have:

steps are named `A`, `B`, `C`, `D`

`A`: search user and view info

`B`: enter or edit user's info

`C`: enter or edit user's username and password

`D`: confirmation

creating new user: `B > C > D`
edit user: `A > B > C > D`
del user: `A > D`

each part includes `prevInfo` incase needed and `onFinish` method when that part is done. finally if the operation is finished there will be a screen shown for confirmation and then success of fail.

in other cases these steps are just repeated but with some specifications for it's own part. for example in `face` subparts step `C` is `Images` for uploading or updating images and these is occurs for `plate` too.


## Settings

### Notifications
Notification handling is handled by a repeating `GET` method inside `TopLevel.js` which is repeated each 60 seconds and gets all the notifications. these notification list then handled by `NotificationUtils.jsx` file inside `utils` folder. 

the process of showing and updating notifications are handled locally. make sure to read comments on the code. showing notifications and messages is handled by `ContextProviderApp.js`.

### Language

The internationalization is handled using several objects starting with `TT` for `TemplateText` inside `./utils/intl.js` and a `textHere`method for choosing which language to show everywhere and a `lang` object which is passed through `ContextProvider.js` everywhere in the app. 

```js
(template text object)={
    some_key_text:{
        fa:'متن فارسی مربوط',
        eng:'english text for that text'
    }
}

```

Layout `RTL` and `LTR` configuration is set in `TopLevel.js`.


## Logging
use `logSomething` method inside `./utils/utils.js` file. 