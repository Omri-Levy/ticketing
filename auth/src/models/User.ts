import mongoose, { Model } from 'mongoose';
import PasswordManager from '../utils/password-manager';

// an interface that describes the properties that are required to create a
// new Order
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describes the properties that a Order Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// an interface that describes the properties that a Order Model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        /* eslint no-underscore-dangle: "off" */
        /* eslint no-param-reassign: "off" */
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

userSchema.pre(`save`, async function (done) {
  if (this.isModified(`password`)) {
    const hashedPassword = await PasswordManager.toHash(this.get(`password`));

    this.set(`password`, hashedPassword);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>(`User`, userSchema);

export default User;
