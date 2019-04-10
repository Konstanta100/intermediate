import { Roles } from 'meteor/alanning:roles'
import { _ } from 'meteor/underscore';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

/*const Schema = {};

Schema.User = new SimpleSchema({
    username: {
        type: String
    },

    createdAt: {
        type: Date,
        autoValue: function() {
            return new Date()
        },
    },

    roles: {
        type: String,

    },

});
if(!Meteor.users.findOne()) {
Meteor.users.attachSchema(Schema.User);
*/

if (Meteor.isServer) {
    
    var users = [
        {name:'Teacher1', password:'qwert1', roles: 'TEACHER' },
        {name:'Teacher2', password:'qwert1', roles: 'TEACHER' },
        {name:'Parent1', password:'qwert1', roles: 'PARENT' },
      ];

    users.forEach((user)=>{
        var id;

        if ( !Meteor.users.findOne({username: user.name})) {

            id = Accounts.createUser({
                username: user.name,
                password: user.password,
                profile: {name: user.name}
            });

            Roles.addUsersToRoles(id, user.roles);
        }    

    });
}






