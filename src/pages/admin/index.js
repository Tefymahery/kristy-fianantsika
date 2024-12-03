import NavbarAdmin from '../../components/admin/NavbarAdmin';
import LoginForm from "../../components/admin/LoginForm";
import FooterAdmin from "../../components/admin/FooterAdmin";



export default function HomeAdmin() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
           <NavbarAdmin />
            <div>
           <LoginForm />
            </div>
            <FooterAdmin />
        </div>
    );
}