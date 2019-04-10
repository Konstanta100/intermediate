import { Roles } from 'meteor/alanning:roles'

// Give authorized users access to sensitive data by group


Meteor.publish(null, function (){
  return Meteor.roles.find({})
})