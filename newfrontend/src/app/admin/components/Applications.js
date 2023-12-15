import {
  adminAcceptPharmacist,
  downloadPharmacistDocs,
  getPharmacists,
} from "@/app/redux/actions/pharmacistActions";
import { removeUser } from "@/app/redux/actions/userActions";
import { BottomCallout } from "@/components/BottomCallout";
import PersonalCard from "@/components/PersonCard";
import TableComponent from "@/components/Table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMYYYY } from "../../redux/validators";
import { DatePicker, DateRangePicker } from "@tremor/react";
import PromptMessage from "@/components/PromptMessage";

//OPTIONAL

const Application = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const onViewFiles = (pharmId) => {
    dispatch(downloadPharmacistDocs(pharmId));
  };
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const { loading: approvalLoading, success: approvalSuccess } = useSelector(
    (state) => state.adminAcceptPharmacistReducer
  );
  const { pharmacists, loading } = useSelector(
    (state) => state.getPharmacistsReducer
  );
  const {
    loading: removeLoading,
    success: removeSuccess,
    error: removeError,
  } = useSelector((state) => state.removeUserReducer);

  useEffect(() => {
    // dispatch(login("sysadmin","pass1234"));
    dispatch(getPharmacists());
  }, [dispatch, removeLoading, approvalLoading]);

  const [freeze, setFreeze] = useState(false);
  const [pharmacistSelected,setPharmacistSelected]=useState(false)
  const handleSelect = (id) => {
    for (let i = 0; i < pharmacistList.length; i++) {
      if (pharmacistList[i]._id == id) {
        setSelected(pharmacistList[i]);
        setPharmacistSelected(true)
        break;
      }
    }
    setFreeze(true);
  };

  const buttons = {
    right: {
      label: "Reject",
      size: "xs",
      variant: "secondary",
      color: "rose",
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
      onClick: (e) => handleDelete(selected._id),
    },
    left: {
      label: "Accept",
      size: "xs",
      variant: "secondary",
      color: "green",
      className: "mx-2",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
      onClick: (e) => {dispatch(adminAcceptPharmacist(selected.pharmacistID))
      setSelected(null)
    setPharmacistSelected(false)
  setFreeze(false)},
    },
  };
  const pharmacistList = useMemo(() => {
    return pharmacists.data
      ?.map(({ _id, user, dateOfBirth, ...rest }) => ({
        ...rest,
        ...user,
        pharmacistID: _id,
        dateOfBirth: formatDateToDDMMYYYY(dateOfBirth),
      }))
      .filter((value) => value.isApproved === false);
  }, [removeError, pharmacists, approvalLoading, approvalSuccess]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const handleDelete = (id) => {
    setShowPrompt(true);
    setDeleteID(id);
  };
  const confirmDelete = () => {
    dispatch(removeUser(deleteID));
    setShowPrompt(!showPrompt);
    setSelected(null);
    setFreeze(false);
  };
  const cancelDelete = () => {
    setShowPrompt(!showPrompt);
  };
  return (
    <>
      {removeSuccess && (
        // Show success message for user removal
        <BottomCallout
          message="Pharmacist rejected successfully"
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
      {approvalSuccess && (
        <BottomCallout
          message="Pharmacist approved successfully and is now moved to pharmacists tab!"
          variant="success"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      <>
      <PromptMessage
          visible={showPrompt}
          setVisible={setShowPrompt}
          message="Are you sure you want to reject this doctor?"
          onConfirm={confirmDelete}
          confirmLoading={removeLoading}
          onCancel={cancelDelete}
        />
        <div className="flex overflow-hidden gap-x-4 gap-y-8">
          <div className="prof flex-1 h-400 overflow-hidden w-4/6 rounded-xl p-10">
            <TableComponent
              setSelected={setSelected}
              rows={pharmacistList}
              columns={["Username", "Name", "Email"]}
              fields={["username", "name", "email"]}
              freeze={freeze}
              filters={<DateRangePicker className="z-10" />}
              buttons={[
                {
                  size: "xs",
                  variant: "secondary",
                  label: "Select",
                  className: "mx-2",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 px"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                      />
                    </svg>
                  ),
                  function: (id) => handleSelect(id),
                },
                {
                  size: "xs",
                  variant: "secondary",
                  label: "Documents",
                  className: "mx-2",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mx-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                      />
                    </svg>
                  ),
                  function: (id) => onViewFiles(id),
                },
              ]}
              badgeColumns={[]}
              title={"Manage the Pending Pharmacists Applications"}
            />
          </div>

          <div className={`prof h-400  ${selected? 'min-w-[0px]' : 'w-[0px]'} overflow-hidden w-2/6 rounded-xl`}>
            <PersonalCard
              imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              name={selected?.name}
              title="Marketing Exec. at Denva Corp"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!"
              data={selected}
              displayColumns={["Status", "Joined On"]}
              actualColumns={["status", "joinedOn"]}
              buttons={buttons}
              selected={pharmacistSelected}
              worker={true}
              fields={[
                "email",
                "dateOfBirth",
                "username",
                "hourlyRate",
                "affiliation",
              ]}
              displayNames={[
                "Email",
                "Birth Date",
                "Username",
                "Hourly Rate",
                "Affiliation",
              ]}
            />
          </div>
        </div>{" "}
      </>
    </>
  );
};

export default Application;
