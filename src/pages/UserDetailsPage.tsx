import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useUpdateUser from "../hooks/useUpdateUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPayload } from "../entities/User";
import { updateUserSchema } from "../schemas/userSchema";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  UpdateUserFormFields,
  UserDetailsFormFields,
} from "../forms/formFields";
import { UserAvatar } from "../components/UserAvatar";
import ApiErrorDisplay from "../components/ApiErrorDisplay";
import { DEFAULT_AVATAR_PATH } from "../constants/api";
import useProfile from "../hooks/useProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { ProfilePayload } from "../entities/Profile";
import { UpdateUserProfileFormValues } from "../forms/UserProfileFormValues";

const UserDetailsPage = () => {
  const { profileId } = useParams();
  const currentUser = useAuthStore((s) => s.profile);
  const navigate = useNavigate();
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const isCurrentUser = currentUser?.id.toString() === profileId;
  const formFields = isCurrentUser
    ? UpdateUserFormFields
    : UserDetailsFormFields;

  const { data: profile, error: fetchingProfileError } = useProfile(profileId!);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    profile?.avatar || null
  );

  useEffect(() => {
    if (profile) {
      setSelectedAvatar(profile.avatar || null);
    }
  }, [profile]);

  const {
    mutate: updateUser,
    error: updateUserErrors,
    isLoading: isUpdatingUser,
  } = useUpdateUser();

  const {
    mutate: updateProfile,
    error: updateProfileErrors,
    isLoading: isUpdatingProfile,
  } = useUpdateProfile(() => {
    navigate("/");
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: validationErrors },
  } = useForm<UpdateUserProfileFormValues>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (profile) {
      const user = profile.user;
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
    }
  }, [profile, setValue]);

  const onSubmit = (formData: UpdateUserProfileFormValues) => {
    if (!profile) return;

    const userPayload: UserPayload = {
      username: formData.username,
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
    };

    const profilePayload: ProfilePayload = {
      bio: formData.bio ?? profile.bio ?? "",
      avatar: formData.avatar,
    };

    updateUser(userPayload);
    updateProfile(profilePayload);
  };

  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"500px"}>
        <CardHeader
          bg={"primaryPurple"}
          h={"20px"}
          borderTopRadius={"7px"}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          {profile?.user.username || "Loading..."}
        </CardHeader>
        <CardBody>
          <HStack justify="center" marginBottom="4">
            <UserAvatar src={profile?.avatar} size="xl" />
          </HStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="4" align="start">
              {formFields.map((field) => (
                <Box key={field.id} w="100%">
                  <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                  <Input
                    {...register(field.id)}
                    id={field.id}
                    type={field.type}
                    accept={field.accept}
                    disabled={!toggleUpdate}
                  />
                  {field.id === "avatar" && (
                    <>
                      <Text>
                        {"Current: " +
                          (selectedAvatar &&
                          selectedAvatar !== DEFAULT_AVATAR_PATH
                            ? selectedAvatar.split("/").pop()
                            : "No avatar selected")}
                      </Text>
                      <Button
                        isDisabled={!toggleUpdate}
                        onClick={() => {
                          setValue("avatar", null);
                          setSelectedAvatar(null);
                        }}
                      >
                        Remove Avatar
                      </Button>
                    </>
                  )}

                  {validationErrors[field.id] && (
                    <Text color="red">
                      {validationErrors[field.id]?.message}
                    </Text>
                  )}
                </Box>
              ))}
              <ApiErrorDisplay error={fetchingProfileError} />
              <ApiErrorDisplay error={updateUserErrors} />
              {isCurrentUser && (
                <HStack justify="center" w="100%" spacing="4">
                  <Button
                    isDisabled={toggleUpdate}
                    onClick={() => setToggleUpdate(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    isDisabled={!toggleUpdate || isUpdatingUser}
                    type="submit"
                  >
                    Save
                  </Button>
                </HStack>
              )}
              {isUpdatingUser && <Spinner />}
            </VStack>
          </form>
        </CardBody>
      </Card>
    </HStack>
  );
};
export default UserDetailsPage;
