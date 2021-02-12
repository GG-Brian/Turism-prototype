window.onload = initial;

var refNewsFormStorage
var refNewsStorageForImages;

function initial() {
  formNewsValidator = document.getElementById("news");

  var newsDNIfileForm = document.getElementById("upDNIfile");
  newsDNIfileForm.addEventListener("change", changeButtonToVerify, false);

  formNewsValidator.addEventListener("submit", newsFormValidationControl, false);


}

//This function will turn the DNI button image invisible and make another image visible to
// indicate the user their file has been received onto the form
function changeButtonToVerify() {
  var unverifiedDNI = document.getElementById("verified-img-file");
  unverifiedDNI.classList.add("d-block");
  var verifiedDNI = document.getElementById("unverified-img-file");
  verifiedDNI.setAttribute("hidden", "");
  verifiedDNI.classList.remove("d-block")
}


function newsFormValidationControl(event) {
  event.preventDefault();
  var newsFormValidator = event.target;
  var newsFormValidationLevel = 0;


  //Email validation section (from form news) -------------------------------------------
  var newsEmailCharacterNeeded = 0;
  var newsEmailSpaceUnneeded = 0;
  var newsEmailLengthIsRealistic = 0;

  var newsEmailForm = newsFormValidator["news-form-email"].value;

  for (var character = 0; character < newsEmailForm.length; character++) {
    if (newsEmailForm[character] == "@") {
      newsEmailCharacterNeeded++;
      newsEmailLengthIsRealistic++;
    } else if (newsEmailForm[character] == " ") {
      newsEmailSpaceUnneeded++;
    } else {
      newsEmailLengthIsRealistic++;
    }
  }

  if (newsEmailCharacterNeeded == 1) {
    document.getElementById("email-at-sign-issue").style.display = "none";
    newsFormValidationLevel++;
  } else {
    document.getElementById("email-at-sign-issue").style.display = "block";
  }

  if (newsEmailSpaceUnneeded == 0) {
    document.getElementById("email-spacing-not-approved").style.display = "none";
    newsFormValidationLevel++;
  } else {
    document.getElementById("email-spacing-not-approved").style.display = "block";
  }

  if (newsEmailLengthIsRealistic > 12) {
    document.getElementById("email-length-not-approved").style.display = "none";
    newsFormValidationLevel++;
  } else {
    document.getElementById("email-length-not-approved").style.display = "block";
  }

  if (!newsEmailForm || newsEmailForm == "") {
    document.getElementById("email-at-sign-issue").style.display = "none";
    document.getElementById("email-spacing-not-approved").style.display = "none";
    document.getElementById("email-length-not-approved").style.display = "none";
    document.getElementById("no-email").style.display = "block";
  } else {
    document.getElementById("no-email").style.display = "none";
    newsFormValidationLevel++;
  }

  //Client name validation section (from form news) -------------------------------------
  var newsClientForm = newsFormValidator["clients-full-name"].value;

  var newsClientNameSeparator = 0;

  for (var character = 0; character < newsClientForm.length; character++) {
    if (newsClientForm[character] == " " && newsClientForm[character + 1] != "") {
      newsClientNameSeparator++;
    }
  }

  if (!newsClientNameSeparator > 0) {
    document.getElementById("name-delimiter-missing").style.display = "block";
  } else {
    document.getElementById("name-delimiter-missing").style.display = "none";
    newsFormValidationLevel++;
  }

  if (!newsClientForm || newsClientForm == "") {
    document.getElementById("name-delimiter-missing").style.display = "none"
    document.getElementById("no-full-name").style.display = "block";
  } else {
    document.getElementById("no-full-name").style.display = "none";
    newsFormValidationLevel++;
  }

  // Email type validation section (from form news) -------------------------------------
  var newsFormSelectionMenu = document.getElementById("option-selector");

  if (newsFormSelectionMenu.value > 0) {
    document.getElementById("no-option-chosen").style.display = "none";
    newsFormValidationLevel++;
  } else {
    document.getElementById("no-option-chosen").style.display = "block";
  }

  // Client age validation section (from form news) -------------------------------------
  var newsClientsAgeForm = newsFormValidator["clients-age"].value;

  var newsClientsAgeUnallowedCharacters = 0;
  var newsClientsAgeSpace = 0;
  var newsClientsAgeDecimal = 0;

  for (var character = 0; character < newsClientsAgeForm.length; character++) {
    if (newsClientsAgeForm[character] > 0 && newsClientsAgeForm[character] < 10) {
      //intentionally empty
    } else if (newsClientsAgeForm[character] == " ") {
      newsClientsAgeSpace++;
    } else if (newsClientsAgeForm[character] == "," || newsClientsAgeForm[character] == ".") {
      newsClientsAgeDecimal++;
    } else if (newsClientsAgeForm[character] == "0" || newsClientsAgeForm[character] == 0) {
      //intentionally empty
    } else {
      newsClientsAgeUnallowedCharacters++
    }
  }

  if (newsClientsAgeSpace > 0) {
    document.getElementById("spacing-client-age").style.display = "block";
  } else {
    document.getElementById("spacing-client-age").style.display = "none";
    newsFormValidationLevel++;
  }

  if (newsClientsAgeForm > 144) {
    document.getElementById("too-large-client-age").style.display = "block";
  } else {
    document.getElementById("too-large-client-age").style.display = "none";
    newsFormValidationLevel++;
  }

  if (newsClientsAgeUnallowedCharacters > 0) {
    document.getElementById("just-numbers-client-age").style.display = "block";
  } else {
    document.getElementById("just-numbers-client-age").style.display = "none";
    newsFormValidationLevel++;
  }

  if (!newsClientsAgeDecimal == 0) {
    document.getElementById("no-decimals-client-age").style.display = "block";
  } else {
    document.getElementById("no-decimals-client-age").style.display = "none";
    newsFormValidationLevel++;
  }

  if (!newsClientsAgeForm || newsClientsAgeForm == "") {
    document.getElementById("no-client-age").style.display = "block";
  } else {
    document.getElementById("no-client-age").style.display = "none";
    newsFormValidationLevel++;
  }

  if (newsClientsAgeForm == "0" || (newsClientsAgeForm > 0 && newsClientsAgeForm <= 13)) {
    document.getElementById("no-baby-clients").style.display = "block";
  } else {
    document.getElementById("no-baby-clients").style.display = "none";
    newsFormValidationLevel++;
  }

  // file uploading validation section (from form news) --------------------------------
  var newsDNIfileForm = document.getElementById("upDNIfile");
  var firstUploadedFile = newsDNIfileForm.files[0];

  if (firstUploadedFile != null) {
    document.getElementById("no-file").style.display = "none";
    newsFormValidationLevel++;

    // Reference to image storage and the user's selected image file, then use it
    // to send the image file of the news form
    refNewsFormStorage = firebase.storage().ref();
    var uploadTask = refNewsFormStorage.child('newsForm/img/' + firstUploadedFile.name).put(firstUploadedFile);

  } else {
    document.getElementById("no-file").style.display = "block";
  }

  // radiobutton validation section (from form news) ------------------------------------
  var newsFormRadioButtonForAds1 = document.getElementById("RadioButton1");
  var newsFormRadioButtonForAds2 = document.getElementById("RadioButton2");

  if (newsFormRadioButtonForAds1.checked) {
    document.getElementById("no-check-selected").style.display = "none";
    newsFormValidationLevel++;
    document.getElementById("ads-result").setAttribute("value", "Sí")

  } else if (newsFormRadioButtonForAds2.checked) {
    document.getElementById("no-check-selected").style.display = "none";
    newsFormValidationLevel++;
    document.getElementById("ads-result").setAttribute("value", "No")

  } else {
    document.getElementById("no-check-selected").style.display = "block";
  }

  // if all validations of form news are correct, data will be pushed to it's
  // database section and will me manageable for the client, otherwise, their
  // data will not be sent (this part covers the "C" (Consult) letter in CRUD)
  if (newsFormValidationLevel == 15) {
    document.getElementById("news-form-uncompleted").style.display = "none";

    // Reset of the DNI button's state because it's data have been sent
    var unverifiedDNI = document.getElementById("verified-img-file");
    unverifiedDNI.classList.remove("d-block");
    var verifiedDNI = document.getElementById("unverified-img-file");
    verifiedDNI.removeAttribute("hidden");
    verifiedDNI.classList.add("d-block")


    uploadTask.on(firebase.storage.TaskEvent.STATE - CHANGED), {
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
        });
      }
    }


    // Reference to databse file where all form data will be sent via "push" method
    refNewsFormDatabase = firebase.database().ref().child("NewsClients");

    refNewsFormDatabase.push({
      Nombre: event.target["client-name"].value,
      Correo: newsEmailForm,
      Tipo: newsFormSelectionMenu.value,
      Edad: newsClientsAgeForm,
      Anuncios: event.target["ads-result"].getAttribute("value")
    });


    theadNewsFormTable = document.getElementById("tbody-news-form-table");

    formNewsValidator.reset();


    // This part is in charge of the showing of all my firebase database "NewsClients"
    // values, covering the "R" (Read) letter in CRUD
    showFirebaseNewsFormData();

    var colorChanger = 1
    function showFirebaseNewsFormData() {
      refNewsFormDatabase.on("value", function (snap) {
        var databaseNewsDataArray = snap.val();
        var showedNewsClientData = "";
        for (var actualArrayItem in databaseNewsDataArray) {
          colorChanger++;
          if (colorChanger % 2 == 0) {
            showedNewsClientData += '<tr class="softer-blue">' +
              "<td>" + databaseNewsDataArray[actualArrayItem].Nombre + "</td>" +
              "<td>" + databaseNewsDataArray[actualArrayItem].Correo + "</td>" +
              "<td>" + databaseNewsDataArray[actualArrayItem].Tipo + "</td>" +
              "<td>" + databaseNewsDataArray[actualArrayItem].Edad + "</td>" +
              "<td>" + databaseNewsDataArray[actualArrayItem].Anuncios + "</td>" +

              "<td>" +
              '<button class="btn Edition" data-newformitem="' + actualArrayItem + '">' +
              '<img src="img/San_Cristobal/News_Form_Icons/Memo_icon.svg.png">' +
              "</button>" +

              '<button class="btn btn-danger Deletion" data-newformitem="' + actualArrayItem + '">' +
              '<img src="img/San_Cristobal/News_Form_Icons/Trashy-icon.png">' +
              "</button>" +
              "</td>" +
              "</tr>";
          } else {
            showedNewsClientData += '<tr class="darker-blue">' +
              "<td>" + databaseNewsDataArray[actualArrayItem].Nombre + "</td>" +
              "<td>" + databaseNewsDataArray[actualArrayItem].Correo + "</td>" +
              "<td>" + databaseNewsDataArray[actualArrayItem].Tipo + "</td>" +
              "<td>" + databaseNewsDataArray[actualArrayItem].Edad + "</td>" +
              "<td>" + databaseNewsDataArray[actualArrayItem].Anuncios + "</td>" +
              "<td>" +
              '<button class="btn Edition" data-newformitem="' + actualArrayItem + '">' +
              '<img src="img/San_Cristobal/News_Form_Icons/Memo_icon.svg.png">' +
              "</button>" +

              '<button class="btn btn-danger Deletion" data-newformitem="' + actualArrayItem + '">' +
              '<img src="img/San_Cristobal/News_Form_Icons/Trashy-icon.png">' +
              "</button>" +
              "</td>" +
              "</tr>";
          }
        }

        theadNewsFormTable.innerHTML = showedNewsClientData;

        // This part is in charge of the edition or deletion of specific database arrays when the user
        // presses on their respective button, covering the "U" (Update) and "D" (Delete) letter in CRUD
        if (showedNewsClientData != "") {
          var editableElements = document.getElementsByClassName("Edition");
          for (var actualEditable = 0; actualEditable < editableElements.length; actualEditable++) {
            editableElements[actualEditable].addEventListener("click", arrayItemEdition, false);
          }

          var deletableElements = document.getElementsByClassName("Deletion");
          for (var actualDeletable = 0; actualDeletable < deletableElements.length; actualDeletable++) {
            deletableElements[actualDeletable].addEventListener("click", arrayItemDeletion, false);
          }
        }
      });
    }

    function arrayItemEdition() {
      var arrayItemEditionSelector = this.getAttribute("data-newformitem");

      var refNewsFormItemToEdit = refNewsFormDatabase.child(arrayItemEditionSelector);
      refNewsFormItemToEdit.once("value", function (snap) {
        var writenDataInNewsForm = snap.val();
        document.getElementById("client-name").value = writenDataInNewsForm.Nombre;
        document.getElementById("email").value = writenDataInNewsForm.Correo;
        document.getElementById("option-selector").value = writenDataInNewsForm.Tipo;
        document.getElementById("client-age").value = writenDataInNewsForm.Edad;

        // Even though writenDataInNewsForm.value has the current client's chosen ads
        // option value, for a reason uknknown to me, the next piece of code will
        // always say it's value is "No" (I even used a
        // "console.log(writenDataInNewsForm.Anuncios)" to confirm what I'm saying here):
        if (writenDataInNewsForm.Anuncios.value = "No") {
          document.getElementById("RadioButton1").checked = false;
          document.getElementById("RadioButton2").checked = true;
        } else {
          document.getElementById("RadioButton2").checked = false;
          document.getElementById("RadioButton1").checked = true;
        }
      });
    }

    function arrayItemDeletion() {
      var arrayItemDeletionSelector = this.getAttribute("data-newformitem");
      var refNewsFormItemToDelete = refNewsFormDatabase.child(arrayItemDeletionSelector);
      refNewsFormItemToDelete.remove();
    }

  } else {
    document.getElementById("news-form-uncompleted").style.display = "block";
  }
}

