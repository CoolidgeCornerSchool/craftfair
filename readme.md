# Coolidge Corner Craft Fair

This site was forked from the [Devo Science Fair](https://github.com/CoolidgeCornerSchool/sciencefair) repo.
This readme probably has some cut-and-paste errors referring to science fair content.

View this site at [https://coolidgecornerschool.github.io/craftfair](https://coolidgecornerschool.github.io/craftfair)

The Craft Fair site has
  * a registration form to sign up for the craft fair
  * a spreadsheet to hold all the form data from people who sign up

### Copying or updating this code

You are welcome to make a copy of this code to run a similar site in
the future, or somewhere else. It's a good example of how to capture
data from web form and save it securely in a web spreadsheet.

This source code is posted on [github](https://github.com/CoolidgeCornerSchool/craftfair).

You can [view it live](http://coolidgecornerschool.github.io/craftfair/)
thanks to a free service called [Github pages](http://pages.github.com). All of the static (html/css/javascript) files in the `gh-pages` branch on github are available live at the project's [github pages url](http://coolidgecornerschool.github.io/craftfair/).

## How this works

The Craft Fair site has two parts:
 * the front end: the pretty web pages, including the sign up form. This is hosted for free on [Github pages](http://pages.github.com).
 * the back end: a Google Docs spreadsheet (with a [web script](https://github.com/CoolidgeCornerSchool/craftfair/blob/gh-pages/Code.gs)) that stores all the registrations. This is also hosted for free, by Google.

When the user clicks 'Submit', the form (front end) posts data to Google Docs (back end).

Here are the **front end** files:

 * index.html - info and signup form
 * tips.md - some tips
 * style.css - the css
 * script.js - posts the form to Google Sheets

For the front end, we use a visual framework called [Twitter
Bootstrap](http://getbootstrap.com), which makes the pages look nice
and easy to edit. In the html files, you can see `<link>`s which load Bootstrap's
css and js files.

## How to use this code
If you want to set up a copy of this site, do the following:

 1. Set up the front end: provide the web form (static html/css/javascript) files. This can be hosted anyplace.
 2. Set up the spreadsheet (see below)
 3. Set up the back end script (see below) to point to the spreadsheet.
 4. Configure `GOOGLE_URL` (in script.js) to point to the back end script.

### 1. Set up the front end

Grab a copy of the files in this repository and put them on a web
server of your choosing. The url will be something you configure with
your hosting provider.

Our site is hosted on [Github pages](http://pages.github.com), which is configured
to be at [http://coolidgecornerschool.github.io/craftfair](http://coolidgecornerschool.github.io/craftfair).

Github pages uses the `CNAME` file, which contains the preferred hostname.


### 2. Set up a spreadsheet

We use Google Sheets (part of Google Docs) to store all the data from
the sign up forms. When a student fills out the sign up form and hits
'Submit', it adds a row to the spreadsheet with all the data they
entered on the form. The spreadsheet is restricted so that only
authorized Science Fair staff can view the data.

You can use this code to set up your own copy of this web form with
your own spreadsheet.  You can easily modify the form and spreadsheet
to store any sign up info you wish.

There are two parts to this:
  * A spreadsheet to hold the data. 
    * Each column contains the answers to one question on the form. Add new columns to correspond to your form's questions.
    * Each row contains the response from each visitor. Rows get added over time as people submit the form.
  * A back-end script that captures the data. This is written in [Google Script](https://www.google.com/script/start/), which is basically exactly the same as Javascript, except it knows how to modify Google documents.
    * The front end contains a form that sends the data (using HTTP POST) to the back end script.
    * The [back end script](https://github.com/DevotionSchool/sciencefair/blob/gh-pages/Code.gs)
reads the POST data and turns it into a new spreadsheet row.

To store form results in a Google Sheets spreadsheet, do the following:

1. Go to Google Docs and create a new spreadsheet
2. Make sure the sheet name (lower left corner) is "Sheet1"
3. Add the form's field names in the 1st row. Remember this is case-sensitive.
  * A1 must be "Timestamp". 
  * A2-A20 are the other field names, like user1, phone1, email1, etc.
4. Limit the spreadsheet to authorized people only. Click `Share` (upper right corner), then `Advanced`, and make sure 'can edit' is only enabled for authorized users.

### 3. Set up the back end script

This script is not bound to the spreadsheet, which means it can have
different access permissions. We want the spreadsheet to be restricted
(so random people can't read the data) but the script to be public (so
random people can post data to it).

1. Visit [script.google.com](http://script.google.com). This will open an editor on a file called Code.gs.
2. Replace the dummy Code.gs content with the Code.gs code from this repository.
3. Replace the value of RESPONSES_DOC_ID with the ID of the spreadsheet you just created (above).
4. Hit `Save`, provide a new project name if needed.
5. Click `Share` (upper right corner). Make sure the script is only visible to authorized users (i.e. just yourself).
6. Choose `Publish` and `Deploy as web app...`. 
7. Set security level and enable access. 
  * Execute as 'me' - this will let the script access the secure spreadsheet.
  * Allow access for 'anyone, even anonymously' - this will let anyone post data to this script.
8. A dialog will confirm the new URL. Update `GOOGLE_URL` in script.js, which is part of the front end.

## Who are Devo's hosting providers?

*(last update: Jan 2016)* This section describes Devotion School's hosting, not just specifically for the science fair. Devotion School is affiliated with these domains:

* `devotionschool.org` 
  * The registrar for this domain is `networksolutions.com`. Contact [Gabriela Kroszynski](mailto:frinulia@hotmail.com) for access. This is prepaid and will expire September 2017.
  * The DNS servers for this domain are hosted at `gamecolony.com`. Contact [Boris Shneyderman](mailto:info@bpssft.com) to manage DNS entries.
  * The subdomain `sciencefair.devotionschool.org` is hosted on [Github pages](http://pages.github.com). This is hosted for free.
  * The subdomain `secure.devotionschool.org` is hosted at BPS Software. It holds the Devo Parent Directory. Contact [Boris Shneyderman](mailto:info@bpssft.com) for more info.

* `brookline.k12.ma.us`
  * This domain is managed by the Town of Brookline
  * It contains content for many schools, not just Devo.
  * The site runs an app called [SchoolWires](http://schoolwires.com), a content management server.
  * For assistance, contact [Gabriela Kroszynski](mailto:frinulia@hotmail.com) or [Tyler Vuylsteke](mailto:Tyler_Vuylsteke@brookline.k12.ma.us)
