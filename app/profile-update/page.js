"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import styles from "../auth.module.css";
import Navbar from "../components/Navbar";
import { COUNTRY_OPTIONS, STATE_OPTIONS, WEST_BENGAL_DISTRICTS, WEST_BENGAL_CITIES_BY_DISTRICT } from "../constants/location";

export default function ProfileDetailsPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [emailMissing, setEmailMissing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedIdentityProofName, setSelectedIdentityProofName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");

  async function submitDetails(event) {
    event.preventDefault();
    setMessage("");
    setEmailMissing(false);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file");
    const identityProof = formData.get("identityProof");
    const nextFieldErrors = {};
    const districtOption = WEST_BENGAL_DISTRICTS.find(
      (option) => option.value === formData.get("district"),
    );
    const cityOptions = districtOption
      ? WEST_BENGAL_CITIES_BY_DISTRICT[districtOption.value] || []
      : [];
    const cityOption = cityOptions.find(
      (option) => option.value === formData.get("city"),
    );
    if (districtOption) {
      formData.set("district", districtOption.label);
    }
    if (cityOption) {
      formData.set("city", cityOption.label);
    }
    const requiredFields = [
      ["country", "country"],
      ["state", "state"],
          ["district", "district"],
          ["city", "city"],
          ["address1", "address 1"],
          ["file", "profile image"],
          ["identityProof", "identity proof"],
        ];

    for (const [fieldName, label] of requiredFields) {
      const value = formData.get(fieldName);
      const isMissing =
        fieldName === "file"
          ? !value || value.size === 0
          : !String(value ?? "").trim();
      if (isMissing) nextFieldErrors[fieldName] = `Your ${label} is missing.`;
    }

    if (file?.size && !file.type.startsWith("image/")) {
      nextFieldErrors.file = "Choose an image file.";
    } else if (file?.size > 5 * 1024 * 1024) {
      nextFieldErrors.file = "Image must be 5 MB or smaller.";
    }
    if (identityProof?.size && !identityProof.type.startsWith("image/")) {
      nextFieldErrors.identityProof = "Choose an image file for identity proof.";
    } else if (identityProof?.size > 5 * 1024 * 1024) {
      nextFieldErrors.identityProof = "Identity proof must be 5 MB or smaller.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) return;

    const email = window.sessionStorage.getItem("signupEmail")?.trim();
    if (!email) {
      setMessage("Signup email not found. Please return to the signup page and try again.");
      setEmailMissing(true);
      return;
    }

    formData.set("email", email);
    formData.set("type", "PHOTOGRAPHER");

    let phone = window.sessionStorage.getItem("signupPhone")?.trim();
    if (!phone) {
      try {
        const signupPayload = JSON.parse(
          window.sessionStorage.getItem("signupPayload") || "{}",
        );
        phone = String(signupPayload.phone || "").trim();
      } catch {
        phone = "";
      }
    }
    if (phone) {
      formData.set("phone", phone);
    }

    setIsSaving(true);
    try {
      const coordinates = await new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve({ latitude: null, longitude: null });
          return;
        }

        navigator.geolocation.getCurrentPosition(
          ({ coords }) =>
            resolve({ latitude: coords.latitude, longitude: coords.longitude }),
          () => resolve({ latitude: null, longitude: null }),
        );
      });
      const latitude = coordinates.latitude === null || coordinates.latitude === undefined
        ? NaN
        : Number(coordinates.latitude);
      const longitude = coordinates.longitude === null || coordinates.longitude === undefined
        ? NaN
        : Number(coordinates.longitude);
      if (Number.isFinite(latitude) && latitude >= -90 && latitude <= 90) {
        formData.set("latitude", String(latitude));
      } else {
        formData.delete("latitude");
      }
      if (Number.isFinite(longitude) && longitude >= -180 && longitude <= 180) {
        formData.set("longitude", String(longitude));
      } else {
        formData.delete("longitude");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profileSetup`,
        {
          method: "POST",
          body: formData,
        },
      );
      const result = await response.json().catch(() => null);
      console.log("Profile details response:", result);
      if (!response.ok) {
        setMessage(
          result?.message ||
            "Could not save profile details. Please try again.",
        );
        return;
      }

      const user = result?.data;
      if (user?._id) {
        window.localStorage.setItem(
          "photoConnectUser",
          JSON.stringify({
            userId: String(user._id),
            name: user.name,
            profileImageUrl: user.profileImageUrl,
            identityProofUrl: user.identityProofUrl,
            accessToken: user.accessToken || result?.accessToken,
            expiresAt: Date.now() + 10 * 24 * 60 * 60 * 1000,
          }),
        );
      }
      window.sessionStorage.removeItem("signupEmail");
      window.sessionStorage.removeItem("signupPhone");
      window.sessionStorage.removeItem("signupPayload");
      const confirmation = await Swal.fire({
        icon: "success",
        title: "Profile saved",
        text: result?.message || "Profile details saved successfully.",
        confirmButtonText: "Go to Home",
      });
      if (confirmation.isConfirmed) {
        router.push("/");
      }
    } catch {
      setMessage("Could not connect to the server. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className={styles.page}>
      <Navbar current="signup" hideAuthActions="true" />
      <section className={styles.content}>
        <div className={`${styles.card} ${styles.profileCard}`}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>PROFILE SETUP</p>
            <h1>Tell us about yourself</h1>
            <p>Add your contact details and profile image.</p>
          </div>

          <form className={styles.profileForm} onSubmit={submitDetails} noValidate>
            <label className={styles.field}>
              <div>
                Country <span aria-hidden="true">*</span>
              </div>
                          <input type="hidden" name="country" value="India" />
                                      <select
                            name="country_display"
                                        required
                                        disabled
                                        defaultValue="India"
                            aria-invalid={Boolean(fieldErrors.country)}
                            aria-describedby={fieldErrors.country ? "country-error" : undefined}
                            onChange={() => setFieldErrors((errors) => ({ ...errors, country: "" }))}
                                      >
                                        {COUNTRY_OPTIONS.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                      {fieldErrors.country && <span className={styles.fieldError} id="country-error">{fieldErrors.country}</span>}
                                    </label>

                                    <label className={styles.field}>
                                      <div>
                                        State <span aria-hidden="true">*</span>
                                      </div>
                          <input type="hidden" name="state" value="West Bengal" />
                                      <select
                                        name="state_display"
                                        required
                                        disabled
                                        defaultValue="West Bengal"
                                        aria-invalid={Boolean(fieldErrors.state)}
                                        aria-describedby={fieldErrors.state ? "state-error" : undefined}
                                        onChange={() => setFieldErrors((errors) => ({ ...errors, state: "" }))}
                                      >
                                        {STATE_OPTIONS.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                      {fieldErrors.state && <span className={styles.fieldError} id="state-error">{fieldErrors.state}</span>}
                                    </label>

                        <label className={styles.field}>
                          <div>
                            District <span aria-hidden="true">*</span>
                          </div>
                          <select
                            name="district"
                            required
                            value={district}
                            onChange={(e) => {
                              setDistrict(e.target.value);
                              setCity("");
                              setFieldErrors((errors) => ({ ...errors, district: "" }));
                            }}
                            aria-invalid={Boolean(fieldErrors.district)}
                            aria-describedby={fieldErrors.district ? "district-error" : undefined}
                          >
                            <option value="">Select District</option>
                            {WEST_BENGAL_DISTRICTS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {fieldErrors.district && <span className={styles.fieldError} id="district-error">{fieldErrors.district}</span>}
                        </label>

                        <label className={styles.field}>
                          <div>
                            City <span aria-hidden="true">*</span>
                          </div>
                          <select
                            name="city"
                            required
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                              setFieldErrors((errors) => ({ ...errors, city: "" }));
                            }}
                            aria-invalid={Boolean(fieldErrors.city)}
                            aria-describedby={fieldErrors.city ? "city-error" : undefined}
                            disabled={!district}
                          >
                            <option value="">Select City</option>
                            {district && WEST_BENGAL_CITIES_BY_DISTRICT[district]?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {fieldErrors.city && <span className={styles.fieldError} id="city-error">{fieldErrors.city}</span>}
                        </label>

            <label className={styles.field}>
              <div>
                Address 1 <span aria-hidden="true">*</span>
              </div>
              <input
                name="address1"
                type="text"
                required
                placeholder="Street address"
                aria-invalid={Boolean(fieldErrors.address1)}
                aria-describedby={fieldErrors.address1 ? "address1-error" : undefined}
                onChange={() => setFieldErrors((errors) => ({ ...errors, address1: "" }))}
              />
              {fieldErrors.address1 && <span className={styles.fieldError} id="address1-error">{fieldErrors.address1}</span>}
            </label>

            <label className={styles.field}>
              Address 2
              <input
                name="address2"
                type="text"
                placeholder="Apartment, suite, etc."
              />
            </label>

            <div
              className={`${styles.profileUpload} ${styles.profileFieldWide}`}
            >
              <p className={styles.profileFileLabel}>
                Profile image <span aria-hidden="true">*</span>
              </p>
              <label className={styles.fileDropzone}>
                <input
                  className={styles.fileInput}
                  name="file"
                  type="file"
                  accept="image/*"
                  aria-label="Choose a profile image"
                  required
                  aria-invalid={Boolean(fieldErrors.file)}
                  aria-describedby={fieldErrors.file ? "file-error" : undefined}
                  onChange={(event) => {
                    setSelectedFileName(
                      event.currentTarget.files?.[0]?.name ?? "",
                    );
                    setMessage("");
                    setFieldErrors((errors) => ({ ...errors, file: "" }));
                  }}
                />
                <span className={styles.uploadIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v5h14v-5" />
                  </svg>
                </span>
                <span className={styles.uploadCopy}>
                  <strong className={styles.uploadFileName}>
                    {selectedFileName || "Choose a profile image"}
                  </strong>
                  <span>
                    {selectedFileName
                      ? "Ready to add to your profile"
                      : "Select a photo from your device"}
                  </span>
                </span>
                <span className={styles.uploadAction}>
                  {selectedFileName ? "Change" : "Browse files"}
                </span>
              </label>
              {fieldErrors.file && <span className={styles.fieldError} id="file-error">{fieldErrors.file}</span>}
            </div>

            <div
              className={`${styles.profileUpload} ${styles.profileFieldWide}`}
            >
              <p className={styles.profileFileLabel}>
                Identity proof <span aria-hidden="true">*</span>
              </p>
              <label className={styles.fileDropzone}>
                <input
                  className={styles.fileInput}
                  name="identityProof"
                  type="file"
                  accept="image/*"
                  aria-label="Choose an identity proof photo"
                  required
                  aria-invalid={Boolean(fieldErrors.identityProof)}
                  aria-describedby={fieldErrors.identityProof ? "identity-proof-error" : undefined}
                  onChange={(event) => {
                    setSelectedIdentityProofName(
                      event.currentTarget.files?.[0]?.name ?? "",
                    );
                    setMessage("");
                    setFieldErrors((errors) => ({ ...errors, identityProof: "" }));
                  }}
                />
                <span className={styles.uploadIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v5h14v-5" />
                  </svg>
                </span>
                <span className={styles.uploadCopy}>
                  <strong className={styles.uploadFileName}>
                    {selectedIdentityProofName || "Choose identity proof"}
                  </strong>
                  <span>Upload a clear JPG, PNG, GIF, or WebP photo (maximum 5 MB)</span>
                </span>
                <span className={styles.uploadAction}>
                  {selectedIdentityProofName ? "Change" : "Browse files"}
                </span>
              </label>
              {fieldErrors.identityProof && (
                <span className={styles.fieldError} id="identity-proof-error">
                  {fieldErrors.identityProof}
                </span>
              )}
            </div>

            {message && (
              <p className={styles.profileNotice} role="status">
                {message}
              </p>
            )}

            {emailMissing && (
              <button
                className={`${styles.submit} ${styles.profileFieldWide}`}
                type="button"
                onClick={() => router.push("/signup")}
              >
                Return to signup
              </button>
            )}

            {!emailMissing && (
              <button
                className={`${styles.submit} ${styles.profileFieldWide}`}
                type="submit"
                disabled={isSaving}
              >
                {isSaving ? "Saving details..." : "Save details"}
              </button>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
