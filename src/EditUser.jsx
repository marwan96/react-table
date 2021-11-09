import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./flymenu.scss";
import { useFormik } from "formik";
import UserSchema from "./UserSchema";
import InputField from "./Input";
import Select from "./Select";
import _ from "lodash";

const EditUser = ({
  showEditUserFlyMenu,
  setShowEditUserFlyMenu,
  user,
  updateListFromEditFlymenu,
  closeFlyMenu
}) => {
  const [userData, setUserData] = useState({});
  const [initialState, setInitialState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    tenant: ""
  });

  const Tenantoptions = [
    {
      value: "amazon",
      label: "Amazon"
    },
    {
      value: "alipkart",
      label: "Flipkart"
    },
    {
      value: "myntra",
      label: "Myntra"
    }
  ];

  const Roleoptions = [
    {
      value: "systemOperator",
      label: "System Operator"
    },
    {
      value: "tenant",
      label: "Tenant"
    },
    {
      value: "systemAdmin",
      label: "System Admin"
    }
  ];

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: UserSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      updateUser(values, setSubmitting, resetForm);
    }
  });
  // console.log("formik", formik.values);
  useEffect(() => {
    setUserData(user);
    if (!_.isEmpty(user)) {
      // console.log("user", user);
      setInitialState({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        id: user.id,
        email: user.email,
        ...(user.roleId && {
          role: { label: user.roleName, value: user.roleId }
        }),
        ...(user.tenantId && {
          tenant: { label: user.tenantName, value: user.tenantId }
        })
      });
    }
  }, [user]);

  const updateUser = (userData, setSubmitting, resetForm) => {
    console.log("userDatafromEdit", userData);
    const data = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      id: userData.id,
      ...(userData.role.value && {
        roleName: userData.role.label,
        roleId: userData.role.value
      }),
      ...(userData.tenant.value && {
        tenantName: userData.tenant.label,
        tenantId: userData.tenant.value
      })
    };
    updateListFromEditFlymenu(data);
    resetForm();
    setSubmitting(false);
    closeFlyMenu();
  };

  return (
    <div
      className={`${
        showEditUserFlyMenu ? "RCflymenu RCflymenuopen" : "RCflymenu"
      }`}
    >
      <div className="RCheaderFlymenu">
        Edit User
        <button
          className="RCcloseButton"
          onClick={() => setShowEditUserFlyMenu(false)}
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="RCbodyFlyMenu">
        <form onSubmit={formik.handleSubmit}>
          <InputField name="email" type="email" label="Email" formik={formik} />
          <InputField
            name="firstName"
            type="text"
            label="First Name"
            formik={formik}
          />
          <InputField
            name="lastName"
            type="text"
            label="Last Name"
            formik={formik}
          />
          <div className="selectcomp">
            <Select
              name="role"
              label="Role"
              value={formik.values.role}
              onChange={(value) => {
                formik.setFieldValue("role", value ? value : "");
              }}
              onBlur={() => formik.setFieldTouched("role", true)}
              error={formik.errors.role}
              touched={formik.touched.role}
              placeholder="Select..."
              options={Roleoptions}
              isClearable={true}
            />
            <Select
              name="tenant"
              label="Tenant"
              value={formik.values.tenant}
              onChange={(value) =>
                formik.setFieldValue("tenant", value ? value : "")
              }
              onBlur={() => formik.setFieldTouched("tenant", true)}
              error={formik.errors.tenant}
              touched={formik.touched.tenant}
              placeholder="Select..."
              options={Tenantoptions}
              isClearable={true}
            />
          </div>
          <InputField
            name="phoneNumber"
            type="string"
            label="Phone"
            formik={formik}
          />
          <div>
            <button type="submit" className="submitButton">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditUser;
