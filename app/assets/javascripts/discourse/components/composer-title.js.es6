import topicSearch from 'discourse/lib/topics-search';
import { default as computed, on } from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['title-input'],

  _initializeAutocomplete: function() {
      var self = this;
      var template = this.container.lookup('template:composer-title-autocomplete.raw');
      self.$('input').autocomplete({
          template,
          dataSource: term => topicSearch({ term }),
          single: true,
          allowAny: false,
          transformComplete: function(v) {
              $("#reply-control").hide();
          }
      });
  }.on('didInsertElement'),



  //@on('didInsertElement')
  //_focusOnTitle() {
  //  if (!this.capabilities.isIOS) {
  //    this.$('input').putCursorAtEnd();
  //  }
  //},
   _removeAutocomplete: function() {
     this.$().autocomplete('destroy');
   }.on('willDestroyElement'),

  @computed('composer.titleLength', 'composer.missingTitleCharacters', 'composer.minimumTitleLength', 'lastValidatedAt')
  validation(titleLength, missingTitleChars, minimumTitleLength, lastValidatedAt) {

    let reason;
    if (titleLength < 1) {
      reason = I18n.t('composer.error.title_missing');
    } else if (missingTitleChars > 0) {
      reason = I18n.t('composer.error.title_too_short', {min: minimumTitleLength});
    } else if (titleLength > this.siteSettings.max_topic_title_length) {
      reason = I18n.t('composer.error.title_too_long', {max: this.siteSettings.max_topic_title_length});
    }

    if (reason) {
      return Discourse.InputValidation.create({ failed: true, reason, lastShownAt: lastValidatedAt });
    }
  },

  @computed('composer.created_at')
   created_at(created_at) {
      if (created_at) {
          var result = new Date();
          result.setDate(created_at.getDate() + 10);
          return result;
      }
   }


});
