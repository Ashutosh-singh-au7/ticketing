import Link from 'next/link';

const LandingPage = ({ currentUser, tickets })=>{
    // console.log(currentUser);
    // console.log(tickets);
    const ticketList = tickets.map(ticket=>{
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>Rs.{ticket.price}</td>
                <td>
                    <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
                        <a>View</a>
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <h2>Tickets Available 😎</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price🇮🇳</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList}
                </tbody>
            </table>
        </div>
    )
};

LandingPage.getInitialProps = async(context, client, currentUser)=>{
    // const client = buildClient(context);
    // const { data } = await client.get('/api/users/currentuser');

    const { data } = await client.get('/api/tickets');

    return { tickets: data };
};

export default LandingPage;