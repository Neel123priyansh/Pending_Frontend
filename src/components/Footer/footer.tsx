export default function Footer() {
//   const [reason, setReason] = useState("");
//   const [email, setEmail] = useState("");
//   const [otherReason, setOtherReason] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !reason) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const finalReason =
//       reason === "Others" ? otherReason || "Others (not specified)" : reason;

//     try {
//       setLoading(true);

//       const response = await fetch("https://aadi-art-backend.onrender.com/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           reason: finalReason,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Message sent successfully");
//         setEmail("");
//         setReason("");
//         setOtherReason("");
//       } else {
//         alert(data.message || "Failed to send message");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server error. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <footer className="bg-[#00df9a] text-[#301934] py-10">
      <div className="max-w-full px-6 mx-auto grid grid-cols-1 md:grid-cols-3 gap-1">

        {/* Newsletter */}
        <div>
          <h2 className="text-xl tracking-wide mb-6 uppercase">
            Connect to Us
          </h2>

          <div className="flex items-center border-b border-[#301934] max-w-md">
            <input
              type="email"
              placeholder="name@email.com"
              className="bg-transparent outline-none py-2 flex-1 placeholder-[#301934]"
            />
            <button className="bg-[#301934] text-white px-8 py-2 text-sm tracking-wide">
              SEND
            </button>
          </div>

          <div className="mt-8 text-sm">
            <p>Pending</p>
            <p>All rights reserved 2025</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:pl-72">

        </div>

        {/* Contact */}
        <div className="flex flex-row pl-10 justify-between">
            <div className="flex flex-col">
                <h3 className="text-lg uppercase mb-6">Quick Links</h3>
                <ul className="space-y-2">
                    <li className="hover:underline cursor-pointer">Home</li>
                    <li className="hover:underline cursor-pointer">About us</li>
                    <li className="hover:underline cursor-pointer">Price</li>
                    <li className="hover:underline cursor-pointer">Contact us</li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h3 className="text-lg uppercase mb-6">Find Us</h3>
                <p className="leading-relaxed">
                    Akash-Vihar, 1st Floor,<br />Sikri Kalan,<br />ModiNagar, UttarPradesh<br/>203204
                </p>
                {/* <p className="mt-2">+91 6969696969</p> */}
            </div>
        </div>
      </div>
      <h1 className='text-[350px] mt-10 font-bold text-[#ECE5E5] text-center'>Pending.</h1>
    </footer>
  );
}