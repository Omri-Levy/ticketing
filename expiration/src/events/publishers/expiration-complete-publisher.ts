import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@omrilevyorg/common';

class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.EXPIRATION_COMPLETE;
}

export default ExpirationCompletePublisher;
