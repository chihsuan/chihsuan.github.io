!function(e,i){function t(e){this.company=i.observable(e.company),this.title=i.observable(e.title),this.date=i.observable(e.date),this.location=i.observable(e.location),this.description=i.observable(e.description)}function a(e){this.school=i.observable(e.school),this.major=i.observable(e.major),this.date=i.observable(e.date),this.description=i.observable(e.description)}function o(e){this.title=i.observable(e.title),this.publication=i.observable(e.publication),this.date=i.observable(e.date)}function r(e){this.title=i.observable(e.title),this.issuer=i.observable(e.issuer),this.date=i.observable(e.date)}function n(){function n(e,i){$.getJSON(e,function(e){e?i(e):b.error("Sorry, currently resume data lost.")}).fail(function(){b.error("Sorry, we have some trouble now, please try again later.")})}function s(i){var n=$.map(i.experience,function(e){return new t(e)}),l=$.map(i.education,function(e){return new a(e)}),s=$.map(i.publications,function(e){return new o(e)}),c=$.map(i.awards,function(e){return new r(e)});b.name(i.name),b.title(i.title),b.aboutMe(i.aboutMe),b.experience(n),b.education(l),b.publications(s),b.awards(c),b.skills(i.skills),i.linkedin&&b.linkedin(i.linkedin),i.twitter&&b.twitter(i.twitter),i.email&&b.email(i.email),i.github&&b.github(i.github),e.initializeMap&&i.location&&(b.location(i.location),e.initializeMap(i.location))}var b=this;b.name=i.observable(""),b.title=i.observable(""),b.skills=i.observable(""),b.aboutMe=i.observable(""),b.linkedin=i.observable(""),b.twitter=i.observable(""),b.email=i.observable(""),b.github=i.observable(""),b.location=i.observable(""),b.publications=i.observableArray([]),b.education=i.observableArray([]),b.experience=i.observableArray([]),b.awards=i.observableArray([]),b.error=i.observable(""),n(l,s)}var l="./resume.json";i.applyBindings(new n)}(window,ko);