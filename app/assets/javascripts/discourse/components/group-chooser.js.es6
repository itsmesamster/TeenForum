import ComboboxView from 'discourse/components/combo-box';
import { categoryBadgeHTML } from 'discourse/helpers/category-link';
import computed from 'ember-addons/ember-computed-decorators';
import { observes, on } from 'ember-addons/ember-computed-decorators';
import PermissionType from 'discourse/models/permission-type';

export default ComboboxView.extend({
    classNames: ['combobox category-combobox'],
    dataAttributes: ['id', 'description_text'],
    overrideWidths: true,
    castInteger: true,

    @computed("scopedGroupId", "groups")
    content(GroupId) {


        const groups= this.site.get('groups')

        return groups
    }
});
