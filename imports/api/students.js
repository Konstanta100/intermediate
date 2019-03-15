import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Students = new Mongo.Collection('students');


const StudentSchema = new SimpleSchema({

  name: {
    type: Object
  },
  'name.firstname': {
    type: String
  },
  'name.lastname': {
    type: String
  },

  parent:{
    type: String,
    autoValue: function() {
      return this.userId
    },
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      return new Date()
    },

  }
});

Students.attachSchema(StudentSchema);

if (Meteor.isServer) {
  Meteor.publish('students', function studentsPublication() {
    return Students.find();
  });

  Meteor.methods({
    insertNewStudent(firstname, lastname){
      check(firstname, String);
      check(lastname, String);
      Students.insert({
        name: {
          firstname: firstname,
          lastname: lastname,
        },
      });
    },
  })
}

