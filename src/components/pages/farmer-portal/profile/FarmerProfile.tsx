"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Input,
  Textarea,
  Button,
  Avatar,
  Select,
  Divider,
  SelectItem,
  Card,
  CardBody,
} from "@nextui-org/react";
import { FaEdit, FaCamera } from "react-icons/fa";

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

interface FarmDetails {
  profilePicture: string | null;
  name: string;
  bio: string;
  about: string;
  region: string;
  town: string;
}

interface Settings {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface EditingState {
  name: boolean;
  bio: boolean;
  about: boolean;
  region: boolean;
  town: boolean;
  password: boolean;
  profilePicture: boolean;
}

const FarmerProfile: React.FC = () => {
  const [farmDetails, setFarmDetails] = useState<FarmDetails>({
    profilePicture: null,
    name: "Current Farm Name",
    bio: "Current bio.",
    about: "Current about section.",
    region: "Current Region",
    town: "Current Town",
  });

  const [settings, setSettings] = useState<Settings>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isEditing, setIsEditing] = useState<EditingState>({
    name: false,
    bio: false,
    about: false,
    region: false,
    town: false,
    password: false,
    profilePicture: false,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFarmDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files[0]) {
    //   setFarmDetails((prevDetails) => ({
    //     ...prevDetails,
    //     profilePicture: URL.createObjectURL(e.target.files[0]),
    //   }));
    // }
  };

  const handleSave = (field: keyof EditingState) => {
    // Add logic to save the updated field
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: false,
    }));
  };

  const handleCancel = (field: keyof EditingState) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: false,
    }));
  };

  return (
    <div className="p-6">
      <section className="mb-8">
        <h2 className="text-3xl text-gray-500 text-center font-bold mb-8">
          Profile Overview
        </h2>
        <div className="mb-4 flex flex-col items-center">
          <div className="relative">
            <Avatar
              src={farmDetails.profilePicture || ""}
              alt="Profile"
              className="mb-2 w-32 h-32 object-cover rounded-full"
            />
            <label
              htmlFor="profilePictureUpload"
              className="absolute bottom-0 right-0"
            >
              <FaCamera className="text-xl cursor-pointer hover:opacity-75" />
            </label>
            <input
              id="profilePictureUpload"
              type="file"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
          {isEditing.profilePicture && (
            <Button
              onClick={() => handleSave("profilePicture")}
              color="primary"
            >
              Save
            </Button>
          )}
        </div>
        {["name", "bio", "about", "region", "town"].map((field) => (
          <Card key={field} className="mb-4">
            <CardBody>
              <label className="font-semibold text-lg text-gray-500 mb-1 capitalize">
                {field}
              </label>
              <div
                className={`flex gap-2 items-start ${
                  isEditing[field as keyof EditingState]
                    ? "flex-col"
                    : "flex-row"
                }`}
              >
                {isEditing[field as keyof EditingState] ? (
                  <>
                    {field === "about" ? (
                      <Textarea
                        name={field}
                        value={farmDetails[field as keyof FarmDetails] || ""}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    ) : field === "region" ? (
                      <Select
                        name={field}
                        selectedKeys={[
                          farmDetails[field as keyof FarmDetails] || "",
                        ]}
                        onSelectionChange={(keys: any) => {
                          setFarmDetails((prevDetails) => ({
                            ...prevDetails,
                            [field]: keys.currentKey,
                          }));
                        }}
                        fullWidth
                      >
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        name={field}
                        value={farmDetails[field as keyof FarmDetails] || ""}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    )}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleSave(field as keyof EditingState)}
                        color="primary"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() =>
                          handleCancel(field as keyof EditingState)
                        }
                        color="danger"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-base font-medium flex-1">
                      {farmDetails[field as keyof FarmDetails]}
                    </p>
                    <FaEdit
                      className="cursor-pointer text-gray-500 hover:opacity-75"
                      size={20}
                      onClick={() =>
                        setIsEditing((prev) => ({ ...prev, [field]: true }))
                      }
                    />
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </section>
      <Divider className="my-4" />
      <section className="mt-8">
        <p className="text-3xl text-gray-500 font-bold text-center mb-8">
          Settings
        </p>
        <Card className="mb-4">
          <CardBody>
            <label className="font-semibold text-lg text-gray-500 mb-1 capitalize">
              Change Password
            </label>
            <div className={`flex gap-2 items-start flex-col`}>
              {isEditing.password ? (
                <>
                  <Input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={settings.currentPassword}
                    onChange={handleSettingsChange}
                    fullWidth
                    className="mb-2"
                  />
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={settings.newPassword}
                    onChange={handleSettingsChange}
                    fullWidth
                    className="mb-2"
                  />
                  <Input
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={settings.confirmNewPassword}
                    onChange={handleSettingsChange}
                    fullWidth
                    className="mb-2"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleSave("password")}
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => handleCancel("password")}
                      color="danger"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-base font-medium flex-1">********</p>
                  <Button
                    radius="sm"
                    color="default"
                    onClick={() =>
                      setIsEditing((prev) => ({ ...prev, password: true }))
                    }
                  >
                    Change Password
                  </Button>
                </>
              )}
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default FarmerProfile;
