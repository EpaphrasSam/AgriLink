// "use client";
// import React from "react";
// import { Tabs, Tab, Link, Card, CardBody, CardHeader } from "@nextui-org/react";

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

// import { passwordValidator } from "@/helpers/bcryptValidator";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// export type FormData = {
//   email: string;
//   username: string;

//   password: string;
//   confirmPassword: string;
// };

// export const UserSchema: ZodType<FormData> = z.object({
//   email: z.string().email(),

//   username: z.string().min(3, { message: "Username is too short" }).max(20),
//   password: z
//     .string()
//     .min(8, { message: "Password is too short" })
//     .max(20, { message: "Password is too long" }),
//   confirmPassword: z.string(),
// });

// export default function Login() {
//   const [selected, setSelected] = React.useState("login");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedRegion, setSelectedRegion] = useState(
//     new Set(["Select Region"])
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<FormData>({
//     resolver: zodResolver(UserSchema), // Apply the zodResolver
//   });

//   console.log(errors);

//   const onSubmit = async (data: FormData) => {
//     console.log("SUCCESS", data);
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
//       <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
//         <CardBody className="overflow-hidden">
//           <Tabs
//             fullWidth
//             size="md"
//             aria-label="Tabs form"
//             selectedKey={selected}
//             onSelectionChange={setSelected}
//           >
//             <Tab key="login" title="Login">
//               <form className="flex flex-col gap-4">
//                 <Input
//                   isRequired
//                   label="Username"
//                   placeholder="Enter your username"
//                   type="username"
//                   {...register("username")}
//                   isInvalid={!!errors.username}
//                   errorMessage={errors.username?.message}
//                 />
//                 <Input
//                   isRequired
//                   label="Password"
//                   placeholder="Enter your password"
//                   {...register("password")}
//                   errorMessage={errors.password?.message}
//                   type="password"
//                 />
//                 <p className="text-center text-small">
//                   Need to create an account?{" "}
//                   <Link size="sm" onPress={() => setSelected("sign-up")}>
//                     Sign up
//                   </Link>
//                 </p>
//                 <div className="flex gap-2 justify-end">
//                   <Button fullWidth color="primary">
//                     Login as Farmer
//                   </Button>
//                   <Button fullWidth color="primary">
//                     Login as Customer
//                   </Button>
//                 </div>
//               </form>
//             </Tab>
//             <Tab key="sign-up" title="Sign up">
//               <form className="flex flex-col gap-4 h-[300px]">
//                 <Input
//                   isRequired
//                   label="Username"
//                   placeholder="Enter your username"
//                   type="username"
//                   {...register("username")}
//                   isInvalid={!!errors.username}
//                   errorMessage={errors.username?.message}
//                 />
//                 <Input
//                   isRequired
//                   label="Password"
//                   placeholder="Enter your password"
//                   {...register("password")}
//                   errorMessage={errors.password?.message}
//                   type="password"
//                 />
//                 <p className="text-center text-small">
//                   Already have an account?{" "}
//                   <Link size="sm" onPress={() => setSelected("login")}>
//                     Login
//                   </Link>
//                 </p>

//                 <div className="flex gap-2 justify-end">
//                   <Button fullWidth color="primary" onPress={onOpen}>
//                     Sign up as Farmer
//                   </Button>
//                   <Button fullWidth color="primary">
//                     Sign up as Customer
//                   </Button>
//                 </div>
//               </form>
//             </Tab>
//           </Tabs>
//         </CardBody>
//       </Card>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalContent>
//           <ModalHeader className="flex flex-col gap-1">
//             Farmer Additional Information
//           </ModalHeader>
//           <ModalBody>
//             <div>
//               <label className="block text-gray-700">Town</label>
//               <Input type="text" placeholder="Enter your town" />
//             </div>
//             <div>
//               <Select label="Select a Region" className="max-w-xs">
//                 {regions.map((region) => (
//                   <SelectItem key={region}>{region}</SelectItem>
//                 ))}
//               </Select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Image</label>
//               <Input type="file" accept="image/*" />
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="danger" variant="light" onPress={onClose}>
//               Close
//             </Button>
//             <Button color="primary" onPress={onClose}>
//               Submit
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

"use client";
import React from "react";
import { Tabs, Tab, Link, Card, CardBody, CardHeader } from "@nextui-org/react";

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

export const UserSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
  username: z.string().min(3, { message: "Username is too short" }).max(20),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
  confirmPassword: z.string(),
});

export default function Login() {
  const [selected, setSelected] = React.useState<string>("login");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRegion, setSelectedRegion] = useState<Set<string>>(
    new Set(["Select Region"])
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  console.log(errors);

  const onSubmit = async (data: FormData) => {
    console.log("SUCCESS", data);
    onOpen(); // Open the modal on successful form submission
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

  const handleTabSelectionChange = (key: any) => {
    setSelected(key as string);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-100 p-6">
      <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={handleTabSelectionChange}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Username"
                  placeholder="Enter your username"
                  type="username"
                  {...register("username")}
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  {...register("password")}
                  errorMessage={errors.password?.message}
                  type="password"
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Login as Farmer
                  </Button>
                  <Button fullWidth color="primary">
                    Login as Customer
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                className="flex flex-col gap-4 h-[300px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  isRequired
                  label="Username"
                  placeholder="Enter your username"
                  type="username"
                  {...register("username")}
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  {...register("password")}
                  errorMessage={errors.password?.message}
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>

                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Sign up as Farmer
                  </Button>
                  <Button type="submit" fullWidth color="primary">
                    Sign up as Customer
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Farmer Additional Information
          </ModalHeader>
          <ModalBody>
            <div>
              <label className="block text-gray-700">Town</label>
              <Input type="text" placeholder="Enter your town" />
            </div>
            <div>
              <Select label="Select a Region" className="max-w-xs">
                {regions.map((region) => (
                  <SelectItem key={region}>{region}</SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-gray-700">Image</label>
              <Input type="file" accept="image/*" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
