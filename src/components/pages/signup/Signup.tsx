// "use client";

// import { z, ZodType } from "zod";
// import { useMemo } from "react";
// import {
//   Input,
//   Button,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
//   Select,
//   SelectItem,
// } from "@nextui-org/react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// export type FormData = {
//   email: string;
//   username: string;
//   password: string;
//   confirmPassword: string;
// };

// export type ModalFormData = {
//   town: string;
//   biography: string;
//   about: string;
//   region: string;
//   image: FileList;
// };

// export const UserSchema: ZodType<FormData> = z
//   .object({
//     email: z.string().email(),
//     username: z.string().min(3, { message: "Username is too short" }).max(20),
//     password: z
//       .string()
//       .min(8, { message: "Password is too short" })
//       .max(20, { message: "Password is too long" }),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"], // path of error
//   });

// export const ModalSchema: ZodType<ModalFormData> = z.object({
//   town: z.string().min(2, { message: "Town is too short" }),
//   biography: z.string().min(10, { message: "Biography is too short" }),
//   about: z.string().min(10, { message: "About is too short" }),
//   region: z.string().nonempty({ message: "Region is required" }),
//   image: z.instanceof(FileList).refine((files) => files.length > 0, {
//     message: "Image is required",
//   }),
// });

// export default function Signup() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedRegion, setSelectedRegion] = useState(
//     new Set(["Select Region"])
//   );
//   const [signupType, setSignupType] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(UserSchema), // Apply the zodResolver
//   });

//   const {
//     register: registerModal,
//     handleSubmit: handleSubmitModal,
//     formState: { errors: modalErrors },
//   } = useForm<ModalFormData>({
//     resolver: zodResolver(ModalSchema),
//   });

//   const onSubmit = async (data: FormData) => {
//     if (Object.keys(errors).length === 0) {
//       console.log("SUCCESS", data);
//       if (signupType === "farmer") {
//         onOpen();
//       } else {
//         console.log("Customer signup successful");
//       }
//     }
//   };

//   const onSubmitModal = async (data: ModalFormData) => {
//     console.log("MODAL SUCCESS", data);
//     onClose();
//   };

//   const handleFarmerSignup = () => {
//     setSignupType("farmer");
//     handleSubmit(onSubmit)();
//   };

//   const handleCustomerSignup = () => {
//     setSignupType("customer");
//   };

//   const regions = [
//     "Greater Accra Region",
//     "Ashanti Region",
//     "Central Region",
//     "Oti Region",
//     "Eastern Region",
//     "Brong Ahafo Region",
//     "Northern Region",
//     "Upper East Region",
//     "Upper West Region",
//     "Western Region",
//     "Savannah Region",
//     "Bono East Region",
//     "Ahafo Region",
//     "North East Region",
//     "Western North Region",
//     "Volta Region",
//   ];

//   const selectedValue = useMemo(
//     () => Array.from(selectedRegion).join(", ").replaceAll("_", " "),
//     [selectedRegion]
//   );

//   const handleSelectionChange = (keys: any) => {
//     setSelectedRegion(new Set(keys));
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-white-100 p-6">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
//         <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-gray-700">Username</label>
//             <Input
//               type="text"
//               placeholder="Enter your username"
//               {...register("username")}
//               isInvalid={!!errors.username}
//               errorMessage={errors.username?.message}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <Input
//               type="text"
//               placeholder="Enter your email"
//               {...register("email")}
//               isInvalid={!!errors.email}
//               errorMessage={errors.email?.message}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Password</label>
//             <Input
//               type="password"
//               placeholder="Enter your password"
//               {...register("password")}
//               isInvalid={!!errors.password}
//               errorMessage={errors.password?.message}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Confirm Password</label>
//             <Input
//               type="password"
//               placeholder="Confirm your password"
//               {...register("confirmPassword")}
//               isInvalid={!!errors.confirmPassword}
//               errorMessage={errors.confirmPassword?.message}
//             />
//           </div>
//           <div className="flex gap-4">
//             <Button
//               type="button"
//               className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
//               onPress={handleFarmerSignup}
//             >
//               Signup as Farmer
//             </Button>
//             <Button
//               type="submit"
//               className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
//               onPress={handleCustomerSignup}
//             >
//               Signup as Customer
//             </Button>
//           </div>
//           <div className="text-center">
//             <a href="/login" className="text-indigo-600 hover:text-indigo-800">
//               Already have an account? Login
//             </a>
//           </div>
//         </form>
//       </div>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalContent>
//           <ModalHeader className="flex flex-col gap-1">
//             Farmer Additional Information
//           </ModalHeader>
//           <ModalBody>
//             <form onSubmit={handleSubmitModal(onSubmitModal)}>
//               <div>
//                 <label className="block text-gray-700">Town</label>
//                 <Input
//                   type="text"
//                   placeholder="Enter your town"
//                   {...registerModal("town")}
//                   isInvalid={!!modalErrors.town}
//                   errorMessage={modalErrors.town?.message}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Biography</label>
//                 <Input
//                   type="text"
//                   placeholder="Enter your Biography"
//                   {...registerModal("biography")}
//                   isInvalid={!!modalErrors.biography}
//                   errorMessage={modalErrors.biography?.message}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">About</label>
//                 <Input
//                   type="text"
//                   placeholder="Enter about your farm"
//                   {...registerModal("about")}
//                   isInvalid={!!modalErrors.about}
//                   errorMessage={modalErrors.about?.message}
//                 />
//               </div>
//               <div>
//                 <Select
//                   label="Select a Region"
//                   className="max-w-xs"
//                   onChange={handleSelectionChange}
//                   {...registerModal("region")}
//                   isInvalid={!!modalErrors.region}
//                   errorMessage={modalErrors.region?.message}
//                 >
//                   {regions.map((region) => (
//                     <SelectItem key={region} value={region}>
//                       {region}
//                     </SelectItem>
//                   ))}
//                 </Select>
//               </div>
//               <div>
//                 <label className="block text-gray-700">Image</label>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   {...registerModal("image")}
//                   isInvalid={!!modalErrors.image}
//                   errorMessage={modalErrors.image?.message}
//                 />
//               </div>
//               <ModalFooter>
//                 <Button
//                   type="button"
//                   color="danger"
//                   variant="light"
//                   onPress={onClose}
//                 >
//                   Close
//                 </Button>
//                 <Button type="submit" color="primary" onPress={onClose}>
//                   Submit
//                 </Button>
//               </ModalFooter>
//             </form>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

"use client";

import { z, ZodType } from "zod";
import { useMemo } from "react";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type ModalFormData = {
  town: string;
  biography: string;
  about: string;
  region: string;
  image: FileList;
};

export const UserSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    username: z.string().min(3, { message: "Username is too short" }).max(20),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export const ModalSchema: ZodType<ModalFormData> = z.object({
  town: z.string().min(2, { message: "Town is too short" }),
  biography: z.string().min(10, { message: "Biography is too short" }),
  about: z.string().min(10, { message: "About is too short" }),
  region: z.string().nonempty({ message: "Region is required" }),
  image: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Image is required",
  }),
});

export default function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRegion, setSelectedRegion] = useState(
    new Set(["Select Region"])
  );
  const [signupType, setSignupType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  const {
    register: registerModal,
    handleSubmit: handleSubmitModal,
    formState: { errors: modalErrors },
  } = useForm<ModalFormData>({
    resolver: zodResolver(ModalSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (Object.keys(errors).length === 0) {
      console.log("SUCCESS", data);
      if (signupType === "farmer") {
        onOpen();
      } else {
        console.log("Customer signup successful");
      }
    }
  };

  const onSubmitModal = async (data: ModalFormData) => {
    console.log("MODAL SUCCESS", data);
    onClose();
  };

  const handleFarmerSignup = () => {
    setSignupType("farmer");
    handleSubmit(onSubmit)();
  };

  const handleCustomerSignup = () => {
    setSignupType("customer");
  };

  const regions = [
    "Greater Accra Region",
    "Ashanti Region",
    "Central Region",
    "Oti Region",
    "Eastern Region",
    "Brong Ahafo Region",
    "Northern Region",
    "Upper East Region",
    "Upper West Region",
    "Western Region",
    "Savannah Region",
    "Bono East Region",
    "Ahafo Region",
    "North East Region",
    "Western North Region",
    "Volta Region",
  ];

  const selectedValue = useMemo(
    () => Array.from(selectedRegion).join(", ").replaceAll("_", " "),
    [selectedRegion]
  );

  const handleSelectionChange = (keys: any) => {
    setSelectedRegion(new Set(keys));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <Input
              type="text"
              placeholder="Enter your email"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
              onPress={handleFarmerSignup}
            >
              Signup as Farmer
            </Button>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
              onPress={handleCustomerSignup}
            >
              Signup as Customer
            </Button>
          </div>
          <div className="text-center">
            <a href="/login" className="text-indigo-600 hover:text-indigo-800">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Farmer Additional Information
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmitModal(onSubmitModal)}>
              <div>
                <label className="block text-gray-700">Town</label>
                <Input
                  type="text"
                  placeholder="Enter your town"
                  {...registerModal("town")}
                  isInvalid={!!modalErrors.town}
                  errorMessage={modalErrors.town?.message}
                />
              </div>
              <div>
                <label className="block text-gray-700">Biography</label>
                <Input
                  type="text"
                  placeholder="Enter your Biography"
                  {...registerModal("biography")}
                  isInvalid={!!modalErrors.biography}
                  errorMessage={modalErrors.biography?.message}
                />
              </div>
              <div>
                <label className="block text-gray-700">About</label>
                <Input
                  type="text"
                  placeholder="Enter about your farm"
                  {...registerModal("about")}
                  isInvalid={!!modalErrors.about}
                  errorMessage={modalErrors.about?.message}
                />
              </div>
              <div>
                <Select
                  label="Select a Region"
                  className="max-w-xs"
                  onChange={handleSelectionChange}
                  isInvalid={!!modalErrors.region}
                  errorMessage={modalErrors.region?.message}
                >
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-gray-700">Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  {...registerModal("image")}
                  isInvalid={!!modalErrors.image}
                  errorMessage={modalErrors.image?.message}
                />
              </div>
              <ModalFooter>
                <Button
                  type="button"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
