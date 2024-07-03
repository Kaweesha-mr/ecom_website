import  { Nav,NavLink } from "@/components/NavBar";


//this will not save cache data for thse admin pages and always fetch data from server
export const dynamic  = "force-dynamic";

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (

        <>
           <Nav>
            <NavLink href="/">Dashbord</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/users">Customers</NavLink>
            <NavLink href="/admin/orders">Sales</NavLink>
           </Nav>
            <div className="container my-6">
                {children}
            </div>
        </>

    );
}

export default AdminLayout;