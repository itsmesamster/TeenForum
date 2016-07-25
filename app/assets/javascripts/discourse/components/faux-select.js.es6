import { url } from 'discourse/lib/computed';
import computed from 'ember-addons/ember-computed-decorators';


export default Ember.Component.extend({
    selected:'',
    change: function(e){
        this.set('selected', e.target.value);
        window.location.href = "/posts/latest?order="+e.target.value;
    }
 });

