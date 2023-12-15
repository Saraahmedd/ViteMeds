import { getPharmacists } from "@/app/redux/actions/pharmacistActions";
import { removeUser } from "@/app/redux/actions/userActions";
import { BottomCallout } from "@/components/BottomCallout";
import PersonalCard from "@/components/PersonCard";
import TableComponent from "@/components/Table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMYYYY } from "../../redux/validators";
import { viewPatients } from "@/app/redux/actions/patientActions";
import PromptMessage from "@/components/PromptMessage";

//OPTIONAL
// const buttons = {
//   right: {
//     label: "Reject",
//     onClick: () => // console.log("Purple button clicked"),
//   },
//   left: {
//     label: "Accept",
//     onClick: () => // console.log("Transparent button clicked"),
//   },
// };

const Patients = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const { patients, loading } = useSelector(
    (state) => state.viewPatientsReducer
  );
  const {
    loading: removeLoading,
    success: removeSuccess,
    error: removeError,
  } = useSelector((state) => state.removeUserReducer);
  useEffect(() => {
    // dispatch(login("sysadmin","pass1234"));
    dispatch(viewPatients());
  }, [dispatch, removeLoading]);

  const [freeze, setFreeze] = useState(false);

  const patientsList = useMemo(() => {
    const t = patients?.data?.map(
      ({ _id, user, emergencyContact, dateOfBirth, ...rest }) => ({
        ...rest,
        eMobileNumber: emergencyContact.mobileNumber,
        eName: emergencyContact.fullName,
        eRelation: emergencyContact.relationToPatient,
        ...user,
        dateOfBirth: formatDateToDDMMYYYY(dateOfBirth),
      })
    );
    // console.log(t);
    return t;
  }, [removeError, patients]);
  // console.log(patientsList);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const handleDelete = (id) => {
    setShowPrompt(true);
    setDeleteID(id);
  };
  const confirmDelete = () => {
    dispatch(removeUser(deleteID));
    setShowPrompt(!showPrompt);
  };
  const cancelDelete = () => {
    setShowPrompt(!showPrompt);
  };
  return (
    <>
      {removeSuccess && (
        // Show success message for user removal
        <BottomCallout
          message="User removed successfully"
          variant="success"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}
      {removeError && (
        // Show error message for user removal failure
        <BottomCallout
          message="Error removing user"
          variant="error"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      <>
      <PromptMessage
          visible={showPrompt}
          setVisible={setShowPrompt}
          message="Are you sure you want to remove this patient?"
          onConfirm={confirmDelete}
          confirmLoading={removeLoading}
          onCancel={cancelDelete}
        />
        <TableComponent
          setSelected={setSelected}
          rows={patientsList}
          columns={[
            "Username",
            "Name",
            "Email",
            "Birth Date",
            "Emergency Contact Number",
            "Emergency Contact Email",
            "Emergency Contact Relation",
          ]}
          fields={[
            "username",
            "name",
            "email",
            "dateOfBirth",
            "eName",
            "eMobileNumber",
            "eRelation",
          ]}
          freeze={freeze}
          buttons={[
            {
              size: "xs",
              variant: "secondary",
              color: "rose",
              label: "Delete",
              className: "mx-2",
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              ),
              function: (id) => handleDelete(id),
            },
          ]}
          badgeColumns={[]}
          title={"Manage Patients"}
        />
      </>
    </>
  );
};

export default Patients;
