"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const COMPANY = {
  name: "Wing Electrical Limited",
  address: "42 college hill, Freemans Bay, Auckland",
  gst: "136263196",
  email: "wingelectrical@hotmail.com",
  bank: "12-3083-0772842-00",
  logo: "/logo.png",
};

function money(value: number) {
  return new Intl.NumberFormat("en-NZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function todayNZ() {
  return new Date().toLocaleDateString("en-NZ");
}

export default function Page() {
  const [invoiceNumber, setInvoiceNumber] = useState("203");
  const [invoiceDate, setInvoiceDate] = useState(todayNZ());
  const [billTo, setBillTo] = useState("Wing Electrical Limited");
  const [siteAddress, setSiteAddress] = useState(
    "42 college hill, Freemans Bay, Auckland"
  );

  const [description, setDescription] = useState(`Scope of Work:
Replacement of approximately 25 switches and power outlets throughout the property.
Perform Insulation Resistance (IR) testing on existing circuits to ensure electrical safety.
Protect and terminate cable ends properly using heat shrink and terminals where required.
General inspection of wiring connections during replacement to ensure safe installation.

Materials Included:
Switches
Power outlets (sockets)
Heat shrink
Terminals

Price includes installation and testing.

Any additional work required due to unforeseen conditions will be discussed before proceeding.
This quote is based on visible conditions only. Hidden faults or issues inside walls, ceilings, or existing wiring are not included.
Existing wiring will remain unless a fault is found that requires repair or replacement.`);

  const [subtotal, setSubtotal] = useState(3130);
  const [gstRate, setGstRate] = useState(15);

  const [quoteValidity, setQuoteValidity] = useState(
    "This quotation is valid for 30 days from the date issued."
  );
  const [paymentTerms, setPaymentTerms] = useState(
    `Please make payment to ${COMPANY.bank}. Deposit may be required before commencement. Full payment is due on completion unless otherwise agreed in writing.`
  );
  const [variationClause, setVariationClause] = useState(
    "Any additional work required due to unforeseen conditions or client-requested changes will be discussed and quoted before proceeding."
  );
  const [complianceClause, setComplianceClause] = useState(
    "All electrical work will be carried out in accordance with New Zealand electrical safety standards and applicable site requirements."
  );
  const [generalExclusions, setGeneralExclusions] = useState(
    "This quote is based on visible conditions only. Hidden faults or issues inside walls, ceilings, underground services, or existing wiring are not included unless specifically stated."
  );
  const [warrantyClause, setWarrantyClause] = useState(
    "Standard workmanship warranty applies to installation works completed by Wing Electrical Limited, subject to normal use and no third-party alteration."
  );

  const gstAmount = useMemo(() => subtotal * (gstRate / 100), [subtotal, gstRate]);
  const total = useMemo(() => subtotal + gstAmount, [subtotal, gstAmount]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 print:bg-white print:p-0">
      <style jsx global>{`
        @media print {
          .page-break {
            page-break-before: always;
            break-before: page;
          }
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <Card className="print:hidden">
          <CardContent className="space-y-5 p-6">
            <h2 className="text-2xl font-semibold">Invoice Builder</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Invoice Number</Label>
                <Input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
              <div>
                <Label>Invoice Date</Label>
                <Input
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Bill To</Label>
              <Input value={billTo} onChange={(e) => setBillTo(e.target.value)} />
            </div>

            <div>
              <Label>Site Address</Label>
              <Input
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
              />
            </div>

            <div>
              <Label>Description / Scope of Work</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[260px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Subtotal</Label>
                <Input
                  type="number"
                  value={subtotal}
                  onChange={(e) => setSubtotal(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>GST %</Label>
                <Input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label>Quote Validity</Label>
              <Textarea
                value={quoteValidity}
                onChange={(e) => setQuoteValidity(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div>
              <Label>Payment Terms</Label>
              <Textarea
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="min-h-24"
              />
            </div>

            <div>
              <Label>Variation Clause</Label>
              <Textarea
                value={variationClause}
                onChange={(e) => setVariationClause(e.target.value)}
                className="min-h-24"
              />
            </div>

            <div>
              <Label>Compliance Clause</Label>
              <Textarea
                value={complianceClause}
                onChange={(e) => setComplianceClause(e.target.value)}
                className="min-h-24"
              />
            </div>

            <div>
              <Label>General Exclusions</Label>
              <Textarea
                value={generalExclusions}
                onChange={(e) => setGeneralExclusions(e.target.value)}
                className="min-h-24"
              />
            </div>

            <div>
              <Label>Warranty Clause</Label>
              <Textarea
                value={warrantyClause}
                onChange={(e) => setWarrantyClause(e.target.value)}
                className="min-h-24"
              />
            </div>

            <Button onClick={() => window.print()}>Export PDF</Button>
          </CardContent>
        </Card>

        <div className="space-y-0 bg-white text-black shadow print:shadow-none">
          {/* PAGE 1 */}
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6 border-b pb-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src={COMPANY.logo}
                      alt="Wing Electrical Limited logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      {COMPANY.name}
                    </h1>
                    <p className="mt-1 text-sm text-slate-700">{COMPANY.address}</p>
                    <p className="text-sm text-slate-700">GST NO: {COMPANY.gst}</p>
                    <p className="text-sm text-slate-700">{COMPANY.email}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold tracking-wide">INVOICE</div>
                  <div className="mt-3 space-y-1 text-sm">
                    <p>
                      <span className="font-semibold">INVOICE # </span>
                      {invoiceNumber}
                    </p>
                    <p>
                      <span className="font-semibold">INVOICE DATE </span>
                      {invoiceDate}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-semibold tracking-[0.15em] text-slate-500">
                  BILL TO
                </div>
                <div className="text-sm leading-7">
                  <div className="font-medium">{billTo}</div>
                  <div>{siteAddress}</div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="grid grid-cols-[1fr_160px] bg-slate-50 px-4 py-3 text-sm font-semibold">
                  <div>DESCRIPTION</div>
                  <div className="text-right">AMOUNT</div>
                </div>

                <div className="grid grid-cols-[1fr_160px] gap-4 px-4 py-4 text-sm">
                  <div className="whitespace-pre-line leading-7">{description}</div>
                  <div className="text-right font-medium">{money(subtotal)}</div>
                </div>
              </div>

              <div className="text-sm leading-7">
                <p>{complianceClause}</p>
              </div>

              <div className="ml-auto max-w-sm overflow-hidden rounded-xl border border-slate-200">
                <div className="space-y-2 px-4 py-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{gstRate.toFixed(1)}%</span>
                    <span>{money(gstAmount)}</span>
                  </div>
                </div>

                <div className="flex justify-between bg-slate-900 px-4 py-4 text-lg font-semibold text-white">
                  <span>INVOICE TOTAL</span>
                  <span>$ {money(total)}</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="mb-2 text-sm font-semibold">TERMS & CONDITIONS</div>
                <div className="space-y-1 text-sm leading-7">
                  <p>{paymentTerms}</p>
                  <p>{quoteValidity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="page-break p-8">
            <div className="space-y-8">
              <div className="flex items-start justify-between gap-6 border-b pb-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src={COMPANY.logo}
                      alt="Wing Electrical Limited logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{COMPANY.name}</h2>
                    <p className="text-sm text-slate-700">{COMPANY.email}</p>
                    <p className="text-sm text-slate-700">GST NO: {COMPANY.gst}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold tracking-wide">
                    TERMS & CONDITIONS
                  </div>
                  <p className="mt-2 text-sm">Invoice # {invoiceNumber}</p>
                  <p className="text-sm">Date: {invoiceDate}</p>
                </div>
              </div>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  1. Quote Validity
                </h3>
                <p className="text-sm leading-7 text-slate-800">{quoteValidity}</p>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  2. Payment Terms
                </h3>
                <p className="text-sm leading-7 text-slate-800">{paymentTerms}</p>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  3. Variations
                </h3>
                <p className="text-sm leading-7 text-slate-800">{variationClause}</p>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  4. Compliance
                </h3>
                <p className="text-sm leading-7 text-slate-800">{complianceClause}</p>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  5. Exclusions / Hidden Conditions
                </h3>
                <p className="text-sm leading-7 text-slate-800">
                  {generalExclusions}
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  6. Warranty
                </h3>
                <p className="text-sm leading-7 text-slate-800">{warrantyClause}</p>
              </section>

              <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  Payment Details
                </h3>
                <p className="text-sm leading-7 text-slate-800">
                  Please make payment to: <span className="font-medium">{COMPANY.bank}</span>
                </p>
                <p className="text-sm leading-7 text-slate-800">
                  Account Name: {COMPANY.name}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}