import './List.css';

//retrieve corresponding contact component
import UserListingContactForm from '../../components/UserListingContactForm/UserListingContactForm';

export default function List() {
    return (
        <main className="List">
            <h1>Contact Us About Your Listing</h1>
            <UserListingContactForm />
        </main>
    );
}