import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import useAuthStore from "../store/authStore";
import useUpdateUser from "../hooks/useUpdateUser";
import { FieldValues, useForm } from "react-hook-form";
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
  userDetailsFormFields,
} from "../constants/formFields";
import { UserAvatar } from "../components/UserAvatar";
import ApiErrorDisplay from "../components/ApiErrorDisplay";
import { DEFAULT_AVATAR_PATH } from "../constants/api";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const currentUser = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const isCurrentUser = currentUser?.id.toString() === userId;
  const formFields = isCurrentUser
    ? UpdateUserFormFields
    : userDetailsFormFields;

  const { data: user, error: fetchingUserError } = useUser(userId!);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    user?.avatar || null
  );
  const {
    mutate: updateUser,
    error: updateUserErrors,
    isLoading: isUpdating,
  } = useUpdateUser(userId!, () => {
    navigate("/");
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: validationErrors },
  } = useForm<UserPayload>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);

      setSelectedAvatar(user.avatar || null);
    }
  }, [user, setValue]);

  const onSubmit = (formData: FieldValues) => {
    const userFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "avatar") {
        if (value instanceof File) {
          userFormData.append("avatar", value);
        } else if (value === null) {
          userFormData.append("avatar", "");
        }
      } else {
        if (value !== undefined) {
          userFormData.append(key, value);
        }
      }
    });

    updateUser(userFormData);
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
          {user?.username || "Loading..."}
        </CardHeader>
        <CardBody>
          <HStack justify="center" marginBottom="4">
            <UserAvatar src={user?.avatar} size="xl" />
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
              <ApiErrorDisplay error={fetchingUserError} />
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
                    isDisabled={!toggleUpdate || isUpdating}
                    type="submit"
                  >
                    Save
                  </Button>
                </HStack>
              )}
              {isUpdating && <Spinner />}
            </VStack>
          </form>
        </CardBody>
      </Card>
    </HStack>
  );
};
export default UserDetailsPage;
