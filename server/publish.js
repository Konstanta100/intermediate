import { Roles } from 'meteor/alanning:roles'


Meteor.publish(null, function (){
  return Meteor.roles.find({})
})