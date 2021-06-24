import Ticket from '../Ticket';

describe(`optimistic concurrency control`, () => {
  it(`implements optimistic concurrency control`, async () => {
    // create an instance of a ticket
    const ticket = await Ticket.build({
      title: `test title`,
      price: 20,
      userId: `test-user-id`,
    });

    await ticket.save();

    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // make two separate changes to the tickets we fetched
    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    // save the first fetched ticket and expect success
    await firstInstance!.save();

    // save the second fetched ticket and expect an error
    await expect(secondInstance!.save()).rejects.toThrow();
  });

  it(`increments the version number on multiple saves`, async () => {
    const ticket = await Ticket.build({
      title: `test title`,
      price: 20,
      userId: `test-user-id`,
    });

    await ticket.save();

    expect(ticket.version).toBe(0);

    await ticket.save();

    expect(ticket.version).toBe(1);

    await ticket.save();

    expect(ticket.version).toBe(2);
  });
});
