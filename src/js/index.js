/*
 * Asynchronous fetch resume data
 * & using knockout.js to binding data to HTML
 *
 * @author chihsuan
 */

(function(window, ko) {

  var RESUME_DATA_PATH = './resume.json';

  /*
   * @description Experience Model
   * @constructor
   * */
  function Experience(data) {
    this.company = ko.observable(data.company);
    this.title = ko.observable(data.title);
    this.date = ko.observable(data.date);
    this.location = ko.observable(data.location);
    this.description = ko.observable(data.description);
  }

  /*
   * @description Education Model
   * @constructor
   * */
  function Education(data) {
    this.school = ko.observable(data.school);
    this.major = ko.observable(data.major);
    this.date = ko.observable(data.date);
    this.description = ko.observable(data.description);
  }

  /*
   * @description Publication Model
   * @constructor
   * */
  function Publication(data) {
    this.title = ko.observable(data.title);
    this.publication = ko.observable(data.publication);
    this.date = ko.observable(data.date);
  }

  /*
   * @description Award Model
   * @constructor
   * */
  function Award(data) {
    this.title = ko.observable(data.title);
    this.issuer = ko.observable(data.issuer);
    this.date = ko.observable(data.date);
  }

  /* @description AppViewModel
   *  @constructor
   * */
  function AppViewModel() {
    var self = this;
    self.name = ko.observable('CHI-HSUAN HUANG');
    self.title = ko.observable('Front-End Web Developer');
    self.skills = ko.observable('Javascript, Data Visualization, Python, Node.js');
    self.aboutMe = ko.observable('');
    self.linkedin = ko.observable('https://www.linkedin.com/in/chihsuanhuang/');
    self.twitter  = ko.observable('');
    self.email = ko.observable('mailto:chihsuan.tw@gmail.com');
    self.github = ko.observable('https://github.com/chihsuan');
    self.location = ko.observable('');
    self.publications = ko.observableArray([]);
    self.education = ko.observableArray([]);
    self.experience = ko.observableArray([]);
    self.awards = ko.observableArray([]);
    self.error = ko.observable('');

    // Init fetch data
    _fetch(RESUME_DATA_PATH, _updateDataModel);

    /**
     * @description asynchronous fetch resume data
     * @param {string} url, RESUME_DATA_PATH
     * @param {function} cb
     */
    function _fetch(url, cb) {
      $.getJSON(url, function(data) {
        if (data) {
          cb(data);
        } else {
          self.error('Sorry, currently resume data lost.');
        }
      }).fail(function(e) {
        // Handle error
        self.error('Sorry, we have some trouble now, please try again later.');
      });
    }

    /**
    * @description update resume data with knockout observable function
    * @param {object} data
    */
    function _updateDataModel(data) {
      var experience = $.map(data.experience, function(item) {
        return new Experience(item);
      });

      var education = $.map(data.education, function(item) {
        return new Education(item);
      });

      var publications = $.map(data.publications, function(item) {
        return new Publication(item);
      });

      var awards = $.map(data.awards, function(item) {
        return new Award(item);
      });

      self.name(data.name);
      self.title(data.title);
      self.aboutMe(data.aboutMe);
      self.experience(experience);
      self.education(education);
      self.publications(publications);
      self.awards(awards);
      self.skills(data.skills);

      if (data.linkedin)
        self.linkedin(data.linkedin);

      if (data.twitter)
        self.twitter(data.twitter);

      if (data.email)
        self.email(data.email);

      if (data.github)
        self.github(data.github);

      if (window.initializeMap && data.location) {
        self.location(data.location);
        window.initializeMap(data.location);
      }
    }
  }

  // binding
  ko.applyBindings(new AppViewModel());

})(window, ko);
