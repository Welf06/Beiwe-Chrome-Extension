1.sending a post request to the url and giving the params in data in the body resulted in an error as the encoding used was wrong when appending to the url
resolution:
   using encodeURIComponent
  url: `https://beiwe.herokuapp.com/extension/setlabel?labels=` + encodeURIComponent(JSON.stringify(labelData))


2. Setting the labels using the url gives 405 error but typing the same url in a new tab manually sets the Label in the database

causes:
      ->The login data and the setLabel requests are sent simultaneously, therefore the request is being sent before loggin in (but the login session is maintained so the probablity of this would be less)